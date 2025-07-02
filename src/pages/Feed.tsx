
import { useState } from "react";
import { 
  TrendingUp, Calendar, Search, 
  University, Target, ArrowLeft, Tag
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockAdmissionNews, mockUniversityProgramInfo } from "@/data/mockData";

const Feed = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState("전체");
  const [universityFilter, setUniversityFilter] = useState({
    university: "",
    department: "",
    sortBy: "grade-low",
    type: "전체"
  });
  const [selectedPrograms, setSelectedPrograms] = useState<number[]>([]);

  const tags = ["전체", "학습 전략", "입시 소식", "수능", "수시", "정시", "학종"];

  const filteredNews = mockAdmissionNews.filter(news => {
    const matchesKeyword = !searchKeyword || 
      news.title.includes(searchKeyword) || 
      news.summary.includes(searchKeyword);
    const matchesTag = selectedTag === "전체" || news.category === selectedTag;
    return matchesKeyword && matchesTag;
  });

  const filteredPrograms = mockUniversityProgramInfo
    .filter(program => 
      (!universityFilter.university || program.university.includes(universityFilter.university)) &&
      (!universityFilter.department || program.department.includes(universityFilter.department)) &&
      (universityFilter.type === "전체" || program.type === universityFilter.type)
    )
    .sort((a, b) => {
      switch(universityFilter.sortBy) {
        case 'grade-low': return a.expectedGrade.average - b.expectedGrade.average;
        case 'grade-high': return b.expectedGrade.average - a.expectedGrade.average;
        case 'quota': return b.quota - a.quota;
        default: return 0;
      }
    });

  const toggleProgramSelection = (id: number) => {
    setSelectedPrograms(prev => 
      prev.includes(id) 
        ? prev.filter(u => u !== id)
        : [...prev, id]
    );
  };

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
      
      {/* 모바일 헤더 */}
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center text-blue-600">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">홈으로</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">어디다녀 피드</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* 이 주의 컨텐츠 - 모바일 배너 */}
        <Card className="mb-6 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 rounded-2xl shadow-lg animate-fade-in">
          <CardContent className="p-0">
            <div className="relative">
              <img 
                src={weeklyContent.image} 
                alt={weeklyContent.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <Badge className="bg-blue-600 text-white mb-2">이 주의 컨텐츠</Badge>
                <h2 className="text-lg font-bold mb-2 leading-tight">
                  {weeklyContent.title}
                </h2>
                <p className="text-sm opacity-90 mb-3">
                  {weeklyContent.summary}
                </p>
                <Button size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
                  자세히 보기
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 모바일 탭 */}
        <Tabs defaultValue="news" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-white rounded-xl shadow-sm h-12">
            <TabsTrigger value="news" className="rounded-xl">입시 뉴스</TabsTrigger>
            <TabsTrigger value="universities" className="rounded-xl">대학 비교</TabsTrigger>
          </TabsList>

          {/* 입시 뉴스 탭 */}
          <TabsContent value="news">
            {/* 모바일 검색 및 필터 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 animate-fade-in">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="검색어를 입력하세요"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-2 focus:border-blue-500"
                />
              </div>
              
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                <Tag className="w-4 h-4 text-gray-500 flex-shrink-0" />
                {tags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                    className={`rounded-full whitespace-nowrap flex-shrink-0 ${
                      selectedTag === tag 
                        ? "bg-blue-600 hover:bg-blue-700" 
                        : "border-gray-300 hover:border-blue-500"
                    }`}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* 모바일 뉴스 리스트 */}
            <div className="space-y-4">
              {filteredNews.map((news, index) => (
                <Card 
                  key={news.id} 
                  className="hover:shadow-lg transition-all duration-300 rounded-2xl animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="rounded-full">
                        {news.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{news.date}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {news.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{news.summary}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-xl border-2 hover:border-blue-500 hover:text-blue-600"
                    >
                      자세히 보기
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 대학 비교 탭 */}
          <TabsContent value="universities">
            {/* 모바일 필터 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 space-y-3 animate-fade-in">
              <Input 
                placeholder="대학 검색..." 
                value={universityFilter.university || ''}
                onChange={(e) => setUniversityFilter(prev => ({...prev, university: e.target.value}))}
                className="h-12 rounded-xl border-2 focus:border-blue-500"
              />
              <Input 
                placeholder="학과 검색..." 
                value={universityFilter.department || ''}
                onChange={(e) => setUniversityFilter(prev => ({...prev, department: e.target.value}))}
                className="h-12 rounded-xl border-2 focus:border-blue-500"
              />
              <Select 
                value={universityFilter.sortBy || 'grade-low'} 
                onValueChange={(value) => setUniversityFilter(prev => ({...prev, sortBy: value}))}
              >
                <SelectTrigger className="w-full h-12 rounded-xl border-2 focus:border-blue-500">
                  <SelectValue placeholder="정렬" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grade-low">평균 등급 낮은순</SelectItem>
                  <SelectItem value="grade-high">평균 등급 높은순</SelectItem>
                  <SelectItem value="quota">모집인원순</SelectItem>
                </SelectContent>
              </Select>
              <Select 
                value={universityFilter.type} 
                onValueChange={(value) => setUniversityFilter(prev => ({...prev, type: value}))}
              >
                <SelectTrigger className="w-full h-12 rounded-xl border-2 focus:border-blue-500">
                  <SelectValue placeholder="지원 전형" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="전체">전체</SelectItem>
                  <SelectItem value="수시">수시</SelectItem>
                  <SelectItem value="정시">정시</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 선택된 전형 비교 */}
            {selectedPrograms.length > 0 && (
              <Card className="bg-blue-50 border-blue-200 rounded-2xl mb-4 animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-blue-900 text-lg">
                    선택된 전형 비교 ({selectedPrograms.length}개)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedPrograms.map(id => {
                      const program = mockUniversityProgramInfo.find(u => u.id === id);
                      if (!program) return null;
                      return (
                        <div key={id} className="bg-white p-4 rounded-xl border">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-900">
                              {program.university} - {program.department} - {program.program}
                            </h4>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleProgramSelection(id)}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              제거
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <div>전형: {program.type} {program.program}</div>
                            <div>예상등급: {program.expectedGrade.average}등급</div>
                            <div>인원: {program.quota}명</div>
                            <div>기간: {program.period}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 모바일 전형 리스트 */}
            <div className="space-y-4">
              {filteredPrograms.map((program, index) => (
                <Card 
                  key={program.id} 
                  className="rounded-2xl animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {program.university} - {program.department}
                        </h3>
                        <div className="flex gap-2 mb-2">
                          <Badge variant={program.type === "수시" ? "default" : "secondary"}>
                            {program.type} {program.program}
                          </Badge>
                          <Badge variant="outline">{program.quota}명</Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* 등급 정보 */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-1 text-sm">예상 합격 등급</h4>
                        <div className="text-xs space-y-1">
                          <div>평균: <span className="font-bold">{program.expectedGrade.average}등급</span></div>
                          <div>{program.expectedGrade.min}~{program.expectedGrade.max}등급</div>
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-1 text-sm">작년 합격 등급</h4>
                        <div className="text-xs space-y-1">
                          <div>평균: <span className="font-bold">{program.lastYearGrade.average}등급</span></div>
                          <div>{program.lastYearGrade.min}~{program.lastYearGrade.max}등급</div>
                        </div>
                      </div>
                    </div>

                    {/* 심사 과목 비율 */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2 text-sm">심사 과목 비율</h4>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(program.examElements).map(([subject, percentage]) => (
                          <Badge key={subject} variant="outline" className="text-xs">
                            {subject} {percentage as number}%
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                        <span>기간: {program.period}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={selectedPrograms.includes(program.id) ? "default" : "outline"}
                        onClick={() => toggleProgramSelection(program.id)}
                        className="flex-1 rounded-xl"
                      >
                        {selectedPrograms.includes(program.id) ? "선택됨" : "비교 추가"}
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-xl">
                        상세보기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
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
      `}</style>
    </div>
  );
};

export default Feed;
