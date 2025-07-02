
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
    university: "",
    department: "",
    sortBy: "grade-low"
  });

  const filteredNews = mockAdmissionNews.filter(news => 
    newsFilter === "전체" || news.category === newsFilter
  );

  const filteredUniversities = mockUniversityInfo
    .filter(uni => 
      (!universityFilter.university || uni.university.includes(universityFilter.university)) &&
      (!universityFilter.department || uni.department.includes(universityFilter.department))
    )
    .sort((a, b) => {
      switch(universityFilter.sortBy) {
        case 'grade-low': return a.expectedGrade.average - b.expectedGrade.average;
        case 'grade-high': return b.expectedGrade.average - a.expectedGrade.average;
        case 'quota': return b.quota - a.quota;
        case 'suji': return a.type.includes('수시') ? -1 : 1;
        case 'jeongsi': return a.type.includes('정시') ? -1 : 1;
        default: return 0;
      }
    });

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
                
                <div className="flex flex-wrap gap-2">
                  <Input 
                    placeholder="대학 검색..." 
                    className="w-40"
                    value={universityFilter.university || ''}
                    onChange={(e) => setUniversityFilter(prev => ({...prev, university: e.target.value}))}
                  />
                  <Input 
                    placeholder="학과 검색..." 
                    className="w-40"
                    value={universityFilter.department || ''}
                    onChange={(e) => setUniversityFilter(prev => ({...prev, department: e.target.value}))}
                  />
                  <Select 
                    value={universityFilter.sortBy || 'grade-low'} 
                    onValueChange={(value) => setUniversityFilter(prev => ({...prev, sortBy: value}))}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="정렬" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grade-low">평균 등급 낮은순</SelectItem>
                      <SelectItem value="grade-high">평균 등급 높은순</SelectItem>
                      <SelectItem value="quota">모집인원순</SelectItem>
                      <SelectItem value="suji">수시</SelectItem>
                      <SelectItem value="jeongsi">정시</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredUniversities.map((uni) => (
                  <Card key={uni.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* 헤더 */}
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold text-gray-900">
                                {uni.university}
                              </h3>
                              <Badge variant="secondary">{uni.department}</Badge>
                            </div>
                            <Badge variant={uni.type.includes("종합") ? "default" : "outline"}>
                              {uni.type}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">
                              {uni.quota}명
                            </div>
                            <div className="text-xs text-gray-500">모집인원</div>
                          </div>
                        </div>

                        {/* 등급 정보 */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">예상 합격 등급</h4>
                            <div className="text-sm space-y-1">
                              <div>평균: <span className="font-bold">{uni.expectedGrade.average}등급</span></div>
                              <div>최소: {uni.expectedGrade.min}등급 / 최고: {uni.expectedGrade.max}등급</div>
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <h4 className="font-medium text-green-900 mb-2">작년 합격 등급</h4>
                            <div className="text-sm space-y-1">
                              <div>평균: <span className="font-bold">{uni.lastYearGrade.average}등급</span></div>
                              <div>최소: {uni.lastYearGrade.min}등급 / 최고: {uni.lastYearGrade.max}등급</div>
                            </div>
                          </div>
                        </div>

                        {/* 심사 요소 */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">심사 요소</h4>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(uni.examElements).map(([subject, percentage]) => (
                              <Badge key={subject} variant="outline" className="text-xs">
                                {subject} {percentage}%
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* 기본 정보 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 pt-2 border-t">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                            <span>모집기간: {uni.period}</span>
                          </div>
                          <div className="flex items-center">
                            <Target className="w-4 h-4 mr-2 text-green-600" />
                            <span>지역: {uni.region}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
