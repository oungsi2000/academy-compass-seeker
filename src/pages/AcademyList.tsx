
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SortAsc } from "lucide-react";
import Header from "@/components/Header";
import SearchForm, { SearchFilters } from "@/components/SearchForm";
import AcademyCard from "@/components/AcademyCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockAcademies, Academy } from "@/data/mockData";

const AcademyList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [academies, setAcademies] = useState<Academy[]>([]);
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  const currentFilters: SearchFilters = {
    keyword: searchParams.get('keyword') || '',
    district: searchParams.get('district') || '',
    subject: searchParams.get('subject') || ''
  };

  useEffect(() => {
    filterAndSortAcademies();
  }, [searchParams, sortBy]);

  const filterAndSortAcademies = () => {
    let filtered = [...mockAcademies];

    // 키워드 필터링
    if (currentFilters.keyword) {
      filtered = filtered.filter(academy => 
        academy.name.includes(currentFilters.keyword) ||
        academy.description.includes(currentFilters.keyword) ||
        academy.subjects.some(subject => subject.includes(currentFilters.keyword))
      );
    }

    // 지역 필터링
    if (currentFilters.district && currentFilters.district !== '전체') {
      filtered = filtered.filter(academy => 
        academy.district === currentFilters.district
      );
    }

    // 과목 필터링
    if (currentFilters.subject && currentFilters.subject !== '전체') {
      filtered = filtered.filter(academy => 
        academy.subjects.includes(currentFilters.subject)
      );
    }

    // 정렬
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'students':
        filtered.sort((a, b) => b.studentCount - a.studentCount);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setAcademies(filtered);
  };

  const handleSearch = (filters: SearchFilters) => {
    const params = new URLSearchParams();
    if (filters.keyword) params.set('keyword', filters.keyword);
    if (filters.district && filters.district !== '전체') params.set('district', filters.district);
    if (filters.subject && filters.subject !== '전체') params.set('subject', filters.subject);
    
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 검색 폼 */}
        <div className="mb-8">
          <SearchForm onSearch={handleSearch} />
        </div>

        {/* 필터 및 정렬 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              학원 검색 결과 ({academies.length}개)
            </h1>
            
            {(currentFilters.keyword || currentFilters.district || currentFilters.subject) && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearFilters}
              >
                필터 초기화
              </Button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              필터
            </Button>

            <div className="flex items-center gap-2">
              <SortAsc className="w-4 h-4 text-gray-500" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">평점 높은순</SelectItem>
                  <SelectItem value="students">수강생 많은순</SelectItem>
                  <SelectItem value="name">이름순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* 활성 필터 표시 */}
        {(currentFilters.keyword || currentFilters.district || currentFilters.subject) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {currentFilters.keyword && (
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                키워드: {currentFilters.keyword}
              </span>
            )}
            {currentFilters.district && currentFilters.district !== '전체' && (
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                지역: {currentFilters.district}
              </span>
            )}
            {currentFilters.subject && currentFilters.subject !== '전체' && (
              <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                과목: {currentFilters.subject}
              </span>
            )}
          </div>
        )}

        {/* 학원 리스트 */}
        <div className="space-y-6">
          {academies.length > 0 ? (
            academies.map((academy) => (
              <AcademyCard key={academy.id} academy={academy} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-600 mb-4">
                다른 검색 조건으로 다시 시도해보세요
              </p>
              <Button onClick={clearFilters}>
                필터 초기화
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademyList;
