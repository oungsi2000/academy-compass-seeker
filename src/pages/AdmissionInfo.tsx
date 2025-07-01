
import { useState } from "react";
import { 
  BookOpen, TrendingUp, Calendar, Filter, 
  Search, University, Target, Lightbulb 
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockAdmissionNews, mockUniversityInfo, studyStrategies } from "@/data/mockData";

const AdmissionInfo = () => {
  const [newsFilter, setNewsFilter] = useState("전체");
  const [universityFilter, setUniversityFilter] = useState({
    type: "전체",
    region: "전체"
  });

  const filteredNews = mockAdmissionNews.filter(news => 
    newsFilter === "전체" || news.category === newsFilter
  );

  const filteredUniversities = mockUniversityInfo.filter(uni => 
    (universityFilter.type === "전체" || uni.type === universityFilter.type) &&
    (universityFilter.region === "전체" || uni.region === universityFilter.region)
  );

  const newsCategories = ["전체", "수능", "수시", "정시", "학종"];
  const admissionTypes = ["전체", "수시", "정시"];
  const regions = ["전체", "서울", "경기", "인천", "대전", "대구", "부산", "광주"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            입시 정보 센터
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            최신 입시 동향부터 학습 전략까지, 성공적인 입시 준비를 위한 모든 정보를 제공합니다
          </p>
        </div>

        {/* 메인 탭 */}
        <Tabs defaultValue="news" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="news">최신 입시 뉴스</TabsTrigger>
            <TabsTrigger value="universities">대학 모집요강</TabsTrigger>
            <TabsTrigger value="strategies">학습 전략</TabsTrigger>
          </TabsList>

          {/* 최신 입시 뉴스 */}
          <TabsContent value="news">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
                  최신 입시 뉴스
                </h2>
                
                <div className="flex gap-2">
                  <Select value={newsFilter} onValueChange={setNewsFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {newsCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
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

          {/* 대학 모집요강 */}
          <TabsContent value="universities">
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <University className="w-6 h-6 mr-2 text-purple-600" />
                  대학 모집요강
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

              <div className="overflow-x-auto">
                <div className="min-w-full">
                  <div className="grid grid-cols-1 gap-4">
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
                            
                            <div className="lg:w-auto">
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
              </div>
            </div>
          </TabsContent>

          {/* 학습 전략 */}
          <TabsContent value="strategies">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2 text-orange-600" />
                과목별 학습 전략
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {Object.entries(studyStrategies).map(([subject, strategies]) => (
                  <Card key={subject} className="h-fit">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                        {subject}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {strategies.map((strategy, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {strategy}
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <Button variant="outline" size="sm" className="w-full">
                          상세 학습법 보기
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 추가 학습 팁 */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">
                    💡 효과적인 학습을 위한 추가 팁
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
                    <div>
                      <h4 className="font-semibold mb-2">시간 관리</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 과목별 학습 시간 배분표 작성</li>
                        <li>• 집중도가 높은 시간대 활용</li>
                        <li>• 규칙적인 휴식과 복습</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">학습 환경</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 방해 요소 제거</li>
                        <li>• 적절한 조명과 온도</li>
                        <li>• 학습 도구 정리정돈</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdmissionInfo;
