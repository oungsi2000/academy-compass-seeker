
import { Search, MapPin, BookOpen } from "lucide-react";
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
        <div className="bg-white rounded-2xl shadow-lg p-6 border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Search className="w-4 h-4 mr-1" />
                학원명/과목
              </label>
              <Input
                type="text"
                placeholder="예: 국어 학원"
                value={filters.keyword}
                onChange={(e) => handleInputChange("keyword", e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                지역
              </label>
              <Select 
                value={filters.district} 
                onValueChange={(value) => handleInputChange("district", value)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="지역 선택" />
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                과목
              </label>
              <Select 
                value={filters.subject} 
                onValueChange={(value) => handleInputChange("subject", value)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="과목 선택" />
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
          </div>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="h-12 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-full p-0"
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
