import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SortAsc, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
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
  const [showSearch, setShowSearch] = useState(false);

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

    if (currentFilters.keyword) {
      filtered = filtered.filter(academy => 
        academy.name.includes(currentFilters.keyword) ||
        academy.description.includes(currentFilters.keyword) ||
        academy.subjects.some(subject => subject.includes(currentFilters.keyword))
      );
    }

    if (currentFilters.district && currentFilters.district !== '전체') {
      filtered = filtered.filter(academy => 
        academy.district === currentFilters.district
      );
    }

    if (currentFilters.subject && currentFilters.subject !== '전체') {
      filtered = filtered.filter(academy => 
        academy.subjects.includes(currentFilters.subject)
      );
    }

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
      case 'fee-high':
        filtered.sort((a, b) => (b.registrationFee || 0) - (a.registrationFee || 0));
        break;
      case 'fee-low':
        filtered.sort((a, b) => (a.registrationFee || 0) - (b.registrationFee || 0));
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
    setShowSearch(false);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* 모바일 헤더 */}
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center text-blue-600">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">돌아가기</span>
          </Link>
          
          <div className="flex gap-2">
            <Button
              onClick={clearFilters}
              variant="outline"
              className="rounded-xl px-3 py-2"
            >
              <Filter className="w-4 h-4 mr-1" />
              초기화
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            학원 {academies.length}곳
          </h1>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32 h-10 rounded-xl">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">평점순</SelectItem>
              <SelectItem value="students">수강생순</SelectItem>
              <SelectItem value="fee-high">등록비↑</SelectItem>
              <SelectItem value="fee-low">등록비↓</SelectItem>
              <SelectItem value="name">이름순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 활성 필터 표시 */}
        {(currentFilters.keyword || currentFilters.district || currentFilters.subject) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {currentFilters.keyword && (
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                "{currentFilters.keyword}"
              </span>
            )}
            {currentFilters.district && currentFilters.district !== '전체' && (
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                {currentFilters.district}
              </span>
            )}
            {currentFilters.subject && currentFilters.subject !== '전체' && (
              <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                {currentFilters.subject}
              </span>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              초기화
            </Button>
          </div>
        )}
      </div>

      {/* 모바일 검색 폼 - 항상 표시 */}
      <div className="bg-white border-b shadow-sm">
        <div className="py-4">
          <SearchForm onSearch={handleSearch} showAdvanced={false} />
        </div>
      </div>

      {/* 모바일 학원 리스트 */}
      <div className="px-4 py-4">
        {academies.length > 0 ? (
          <div className="space-y-4">
            {academies.map((academy, index) => (
              <div 
                key={academy.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AcademyCard academy={academy} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-600 mb-4">
              다른 조건으로 검색해보세요
            </p>
            <Button onClick={clearFilters} className="bg-blue-600 hover:bg-blue-700 rounded-xl">
              필터 초기화
            </Button>
          </div>
        )}
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AcademyList;
