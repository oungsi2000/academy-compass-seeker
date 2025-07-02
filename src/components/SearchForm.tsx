
import { Search, MapPin, BookOpen } from "lucide-react";
import { useState } from "react";
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
    district: "강남구",
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

  if (!showAdvanced) {
    return (
      <div className="px-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="학원명이나 과목을 검색하세요"
              value={filters.keyword}
              onChange={(e) => handleInputChange("keyword", e.target.value)}
              className="flex-1 h-12 text-base rounded-xl border-2 focus:border-blue-500 transition-all duration-300"
            />
            <Button 
              type="submit" 
              size="lg" 
              className="px-4 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
            <div className="flex items-center mb-2">
              <MapPin className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">지역 선택</span>
            </div>
            <Select 
              value={filters.district} 
              onValueChange={(value) => handleInputChange("district", value)}
            >
              <SelectTrigger className="w-full h-10 text-sm rounded-lg border focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district} className="text-sm py-2">
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="px-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 지역 선택 */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4 animate-fade-in">
          <div className="flex items-center mb-3">
            <MapPin className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-gray-700">지역</span>
          </div>
          <Select 
            value={filters.district} 
            onValueChange={(value) => handleInputChange("district", value)}
          >
            <SelectTrigger className="w-full h-12 text-base rounded-xl border-2 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district} className="text-base py-3">
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 과목 선택 */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center mb-3">
            <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-gray-700">과목</span>
          </div>
          <Select 
            value={filters.subject} 
            onValueChange={(value) => handleInputChange("subject", value)}
          >
            <SelectTrigger className="w-full h-12 text-base rounded-xl border-2 focus:border-blue-500">
              <SelectValue placeholder="과목을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject} className="text-base py-3">
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 검색어 입력 */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center mb-3">
            <Search className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-gray-700">검색어</span>
          </div>
          <Input
            type="text"
            placeholder="학원명이나 키워드를 입력하세요"
            value={filters.keyword}
            onChange={(e) => handleInputChange("keyword", e.target.value)}
            className="w-full h-12 text-base rounded-xl border-2 focus:border-blue-500 transition-all duration-300"
          />
        </div>

        {/* 검색 버튼 */}
        <Button 
          type="submit" 
          size="lg" 
          className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <Search className="w-6 h-6 mr-2" />
          학원 찾기
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
