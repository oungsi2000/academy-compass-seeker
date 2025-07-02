import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Plus, TrendingUp, Award, Calendar, Heart, MessageCircle, Share2 } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockAcademies } from "@/data/mockData";

interface StudentResult {
  id: number;
  studentName: string;
  avatar: string;
  resultType: "입시결과" | "시험결과" | "성적향상";
  title: string;
  description: string;
  beforeScore?: string;
  afterScore?: string;
  university?: string;
  department?: string;
  examType?: string;
  date: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const mockResults: StudentResult[] = [
  {
    id: 1,
    studentName: "김학생",
    avatar: "/placeholder.svg",
    resultType: "입시결과",
    title: "서울대 경영학과 합격! 🎉",
    description: "2년간 국어학원에서 열심히 공부한 결과 드디어 꿈꿔왔던 서울대에 합격했습니다! 선생님들께 정말 감사드려요.",
    university: "서울대학교",
    department: "경영학과",
    examType: "학생부종합전형",
    date: "2024-12-15",
    likes: 24,
    comments: 8,
    isLiked: false
  },
  {
    id: 2,
    studentName: "이수학",
    avatar: "/placeholder.svg",
    resultType: "성적향상",
    title: "국어 성적 2등급 → 1등급 달성!",
    description: "비문학이 정말 어려웠는데 선생님의 체계적인 지도 덕분에 드디어 1등급을 받을 수 있었어요!",
    beforeScore: "2등급",
    afterScore: "1등급",
    examType: "6월 모의고사",
    date: "2024-12-10",
    likes: 15,
    comments: 5,
    isLiked: true
  },
  {
    id: 3,
    studentName: "박영어",
    avatar: "/placeholder.svg",
    resultType: "시험결과",
    title: "수능 국어 96점 달성!",
    description: "처음에는 80점대였는데 꾸준히 학원에서 공부한 결과 수능에서 96점을 받았습니다!",
    beforeScore: "82점",
    afterScore: "96점",
    examType: "2024 수능",
    date: "2024-12-05",
    likes: 31,
    comments: 12,
    isLiked: false
  }
];

const StudentResults = () => {
  const { academyId } = useParams();
  const [results, setResults] = useState<StudentResult[]>(mockResults);
  const academy = mockAcademies.find(a => a.id === Number(academyId));

  const handleLike = (resultId: number) => {
    setResults(prev => prev.map(result => 
      result.id === resultId 
        ? { 
            ...result, 
            isLiked: !result.isLiked,
            likes: result.isLiked ? result.likes - 1 : result.likes + 1
          }
        : result
    ));
  };

  if (!academy) {
    return <div>학원을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to={`/academy/${academyId}`} className="flex items-center text-blue-600">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">학원으로 돌아가기</span>
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            결과 공유하기
          </Button>
        </div>
        
        <div className="mt-4">
          <h1 className="text-xl font-bold text-gray-900">
            {academy.name} 학생 결과
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            우리 학원 학생들의 입시·시험 결과를 확인해보세요
          </p>
        </div>
      </div>

      {/* 결과 리스트 */}
      <div className="px-4 py-4 space-y-4">
        {results.map((result) => (
          <Card key={result.id} className="hover:shadow-lg transition-shadow rounded-2xl">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={result.avatar} />
                    <AvatarFallback>{result.studentName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{result.studentName}</span>
                      <Badge 
                        variant={result.resultType === "입시결과" ? "default" : result.resultType === "성적향상" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {result.resultType}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{result.date}</p>
                  </div>
                </div>
              </div>
              
              <CardTitle className="text-lg font-bold mt-3">
                {result.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-gray-700 mb-4 leading-relaxed">
                {result.description}
              </p>
              
              {/* 결과 상세 정보 */}
              {result.resultType === "입시결과" && result.university && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">합격 정보</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">대학:</span> {result.university}</div>
                    <div><span className="font-medium">학과:</span> {result.department}</div>
                    <div><span className="font-medium">전형:</span> {result.examType}</div>
                  </div>
                </div>
              )}
              
              {(result.resultType === "성적향상" || result.resultType === "시험결과") && result.beforeScore && result.afterScore && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">성적 정보</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">이전:</span>
                      <span className="ml-2 font-medium">{result.beforeScore}</span>
                    </div>
                    <div className="text-gray-400">→</div>
                    <div>
                      <span className="text-gray-600">이후:</span>
                      <span className="ml-2 font-medium text-blue-600">{result.afterScore}</span>
                    </div>
                  </div>
                  <div className="mt-1 text-sm">
                    <span className="text-gray-600">시험:</span>
                    <span className="ml-2">{result.examType}</span>
                  </div>
                </div>
              )}
              
              {/* 액션 버튼 */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(result.id)}
                    className={`p-2 ${result.isLiked ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${result.isLiked ? 'fill-current' : ''}`} />
                    {result.likes}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="p-2 text-gray-500">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {result.comments}
                  </Button>
                </div>
                
                <Button variant="ghost" size="sm" className="p-2 text-gray-500">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentResults;