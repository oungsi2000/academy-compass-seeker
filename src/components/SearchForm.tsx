
import { Search, MapPin, BookOpen, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  showAdvanced?: boolean;
}

export interface SearchFilters {
  keyword: string;
  district: string;
  subject: string;
}

const SearchForm = ({ onSearch, showAdvanced = true }: SearchFormProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: "",
    district: "강남구", // 기본으로 가장 가까운 위치 설정
    subject: ""
  });

  const districts = [
    "전체", "강남구", "서초구", "종로구", "중구", "용산구", 
    "성동구", "광진구", "동대문구", "중랑구", "성북구"
  ];

  const subjects = [
    "전체", "국어", "수학", "영어", "한국사", "사회탐구", 
    "과학탐구", "제2외국어", "논술", "면접"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      {showAdvanced ? (
        <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2">
          <div className="flex items-center gap-2">
            {/* 지역 선택 */}
            <div className="flex items-center bg-gray-900 text-white px-4 py-3 rounded-full min-w-[120px]">
              <MapPin className="w-4 h-4 mr-2" />
              <Select 
                value={filters.district} 
                onValueChange={(value) => handleInputChange("district", value)}
              >
                <SelectTrigger className="border-none bg-transparent text-white shadow-none p-0 h-auto focus:ring-0">
                  <div className="flex items-center">
                    <SelectValue />
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 구분선 */}
            <div className="w-px h-6 bg-gray-200"></div>

            {/* 과목 선택 */}
            <div className="flex items-center px-4 py-3 min-w-[100px]">
              <Select 
                value={filters.subject} 
                onValueChange={(value) => handleInputChange("subject", value)}
              >
                <SelectTrigger className="border-none shadow-none p-0 h-auto focus:ring-0">
                  <div className="flex items-center text-gray-700">
                    <SelectValue placeholder="과목" />
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 구분선 */}
            <div className="w-px h-6 bg-gray-200"></div>

            {/* 검색어 입력 */}
            <div className="flex-1 px-4">
              <Input
                type="text"
                placeholder="검색어를 입력해주세요"
                value={filters.keyword}
                onChange={(e) => handleInputChange("keyword", e.target.value)}
                className="border-none shadow-none focus-visible:ring-0 p-0 text-gray-500 placeholder:text-gray-400"
              />
            </div>

            {/* 검색 버튼 */}
            <Button 
              type="submit" 
              className="h-12 w-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full p-0 ml-2"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="학원명이나 과목을 검색하세요"
            value={filters.keyword}
            onChange={(e) => handleInputChange("keyword", e.target.value)}
            className="flex-1 h-12"
          />
          <Button type="submit" size="lg" className="px-6">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      )}
    </form>
  );
};

export default SearchForm;
