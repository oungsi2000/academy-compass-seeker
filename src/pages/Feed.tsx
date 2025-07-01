
import { useState } from "react";
import { 
  TrendingUp, Calendar, Filter, 
  Search, University, Target, 
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockAdmissionNews, mockUniversityInfo } from "@/data/mockData";

const Feed = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState("전체");
  const [universityFilter, setUniversityFilter] = useState({
    type: "전체",
    region: "전체"
  });
  const [selectedUniversities, setSelectedUniversities] = useState<number[]>([]);

  const tags = ["전체", "학습 전략", "입시 소식", "수능", "수시", "정시", "학종"];

  const filteredNews = mockAdmissionNews.filter(news => {
    const matchesKeyword = !searchKeyword || 
      news.title.includes(searchKeyword) || 
      news.summary.includes(searchKeyword);
    const matchesTag = selectedTag === "전체" || news.category === selectedTag;
    return matchesKeyword && matchesTag;
  });

  const filteredUniversities = mockUniversityInfo.filter(uni => 
    (universityFilter.type === "전체" || uni.type === universityFilter.type) &&
    (universityFilter.region === "전체" || uni.region === universityFilter.region)
  );

  const toggleUniversitySelection = (id: number) => {
    setSelectedUniversities(prev => 
      prev.includes(id) 
        ? prev.filter(u => u !== id)
        : [...prev, id]
    );
  };

  const admissionTypes = ["전체", "수시", "정시"];
  const regions = ["전체", "서울", "경기", "인천", "대전", "대구", "부산", "광주"];

  // 이 주의 컨텐츠 (메인 배너)
  const weeklyContent = {
    title: "2024 수능 후 정시 지원 전략",
    summary: "수능 점수 발표 후 효과적인 정시 지원 전략과 대학별 배치표 분석",
    image: "/placeholder.svg",
    category: "입시 소식",
    date: "2024.12.09"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            어디다녀 피드
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            최신 입시 동향부터 학습 전략까지, 성공적인 입시 준비를 위한 모든 정보를 제공합니다
          </p>
        </div>

        {/* 이 주의 컨텐츠 - 메인 배너 */}
        <Card className="mb-8 overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3">
                <img 
                  src={weeklyContent.image} 
                  alt={weeklyContent.title}
                  className="w-full h-48 lg:h-full object-cover"
                />
              </div>
              <div className="lg:w-2/3 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-blue-600 text-white">이 주의 컨텐츠</Badge>
                  <Badge variant="outline">{weeklyContent.category}</Badge>
                  <span className="text-sm text-gray-500">{weeklyContent.date}</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {weeklyContent.title}
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  {weeklyContent.summary}
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  자세히 보기
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 메인 탭 */}
        <Tabs defaultValue="news" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="news">최신 입시 뉴스</TabsTrigger>
            <TabsTrigger value="universities">대학 모집요강 비교</TabsTrigger>
          </TabsList>

          {/* 최신 입시 뉴스 */}
          <TabsContent value="news">
            <div className="space-y-6">
              {/* 검색 및 필터 */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
                  최신 입시 뉴스
                </h2>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="검색어를 입력하세요"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedTag} onValueChange={setSelectedTag}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.map(tag => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredNews.map((news) => (
                  <Card key={news.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <Badge variant="secondary" className="mb-2">
                          {news.category}
                        </Badge>
                        <span className="text-sm text-gray-500">{news.date}</span>
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {news.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{news.summary}</p>
                      <Button variant="outline" size="sm">
                        자세히 보기
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* 대학 모집요강 비교 */}
          <TabsContent value="universities">
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <University className="w-6 h-6 mr-2 text-purple-600" />
                  대학 모집요강 비교
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select 
                    value={universityFilter.type} 
                    onValueChange={(value) => setUniversityFilter(prev => ({...prev, type: value}))}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="전형 유형" />
                    </SelectTrigger>
                    <SelectContent>
                      {admissionTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={universityFilter.region} 
                    onValueChange={(value) => setUniversityFilter(prev => ({...prev, region: value}))}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="지역" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map(region => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 선택된 대학 비교 */}
              {selectedUniversities.length > 0 && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-900">
                      선택된 대학 비교 ({selectedUniversities.length}개)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedUniversities.map(id => {
                        const uni = mockUniversityInfo.find(u => u.id === id);
                        if (!uni) return null;
                        return (
                          <div key={id} className="bg-white p-4 rounded-lg border">
                            <h4 className="font-bold text-gray-900 mb-2">{uni.university}</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>전형: {uni.type}</p>
                              <p>지역: {uni.region}</p>
                              <p>모집인원: {uni.quota}명</p>
                              <p>기간: {uni.period}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleUniversitySelection(id)}
                              className="mt-2 w-full"
                            >
                              비교에서 제거
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                {filteredUniversities.map((uni) => (
                  <Card key={uni.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              {uni.university}
                            </h3>
                            <Badge variant={uni.type === "수시" ? "default" : "secondary"}>
                              {uni.type}
                            </Badge>
                            <Badge variant="outline">{uni.region}</Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                              <span>모집기간: {uni.period}</span>
                            </div>
                            <div className="flex items-center">
                              <Target className="w-4 h-4 mr-2 text-green-600" />
                              <span>모집인원: {uni.quota}명</span>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <p className="text-sm text-gray-500 mb-2">전형요소:</p>
                            <div className="flex flex-wrap gap-1">
                              {uni.requirements.map((req, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:w-auto flex gap-2">
                          <Button
                            size="sm"
                            variant={selectedUniversities.includes(uni.id) ? "default" : "outline"}
                            onClick={() => toggleUniversitySelection(uni.id)}
                          >
                            {selectedUniversities.includes(uni.id) ? "선택됨" : "비교 추가"}
                          </Button>
                          <Button size="sm" variant="outline">
                            상세보기
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Feed;
