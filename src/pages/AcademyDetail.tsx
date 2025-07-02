
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Star, MapPin, Users, Calendar, BookOpen, 
  Award, Camera, Gift, ArrowLeft, MessageCircle, 
  DollarSign, Flag, Wifi, Car, Coffee, Monitor,
  Users2, Shield, Zap, Clock, ImageIcon
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAcademies } from "@/data/mockData";
import TeacherDetailDialog from "@/components/TeacherDetailDialog";
import ReportDialog from "@/components/ReportDialog";
import TeacherSlider from "@/components/TeacherSlider";

const AcademyDetail = () => {
  const { id } = useParams();
  const academy = mockAcademies.find(a => a.id === Number(id));
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isTeacherDialogOpen, setIsTeacherDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  // 시설 아이콘 매핑
  const facilityIcons: { [key: string]: any } = {
    "개별 학습실": Users2,
    "자습실": BookOpen,
    "상담실": MessageCircle,
    "휴게 공간": Coffee,
    "무료 Wi-Fi": Wifi,
    "주차 공간": Car,
    "스마트 보드": Monitor,
    "CCTV 보안시설": Shield,
    "냉난방 시설": Zap,
    "24시간 개방": Clock
  };

  if (!academy) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              학원을 찾을 수 없습니다
            </h1>
            <Link to="/academies">
              <Button>학원 목록으로 돌아가기</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleTeacherClick = (teacher: any) => {
    setSelectedTeacher(teacher);
    setIsTeacherDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="px-4 py-4">
        {/* 줄어든 뒤로가기 버튼 */}
        <Link to="/academies">
          <Button variant="ghost" size="sm" className="mb-4 p-2">
            <ArrowLeft className="w-4 h-4 mr-1" />
            뒤로
          </Button>
        </Link>

        {/* 간소화된 학원 기본 정보 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          {/* 학원 이미지 */}
          <img 
            src={academy.image} 
            alt={academy.name}
            className="w-full h-48 object-cover rounded-xl mb-4"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />

          {/* 학원 정보 */}
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {academy.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-1 rounded-full text-sm">
                <Star className="w-4 h-4 fill-current mr-1" />
                <span className="font-medium">{academy.rating}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsReportDialogOpen(true)}
                className="text-red-600 border-red-200 hover:bg-red-50 text-xs p-2"
              >
                <Flag className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {academy.description}
          </p>

          {/* 간단한 정보 */}
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
              <span className="truncate">{academy.address}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2 text-green-600" />
                <span>수강생 {academy.studentCount}명</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 mr-1 text-emerald-600" />
                <span className="font-medium">{academy.registrationFee.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          {/* 과목 태그 */}
          <div className="flex flex-wrap gap-1 mb-4">
            {academy.subjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs">
                {subject}
              </Badge>
            ))}
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open(`tel:${academy.phone}`)}
            >
              상담 신청
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageCircle className="w-4 h-4 mr-2" />
              문의하기
            </Button>
          </div>

          {/* 이벤트 정보 */}
          {academy.events.length > 0 && (
            <div className="mt-4 p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
              <div className="flex items-center mb-2">
                <Gift className="w-4 h-4 text-red-600 mr-2" />
                <h3 className="font-bold text-red-700 text-sm">진행중인 이벤트</h3>
              </div>
              <div className="space-y-1">
                {academy.events.map((event, index) => (
                  <p key={index} className="text-red-600 text-xs">• {event}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 상세 정보 탭 */}
        <Tabs defaultValue="teachers" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="teachers" className="text-xs">강사진</TabsTrigger>
            <TabsTrigger value="curriculum" className="text-xs">커리큘럼</TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs">후기</TabsTrigger>
            <TabsTrigger value="facilities" className="text-xs">시설</TabsTrigger>
          </TabsList>

          <TabsContent value="teachers">
            <TeacherSlider teachers={academy.teachers} onTeacherClick={handleTeacherClick} />
          </TabsContent>

          <TabsContent value="curriculum">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                학습 커리큘럼
              </h3>
              <div className="space-y-3">
                {academy.curriculum.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-900 text-sm flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {academy.reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl p-4 shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{review.studentName}</h4>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < review.rating ? 'fill-current' : ''}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3 text-sm">{review.content}</p>
                  {/* 후기 사진 */}
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center text-gray-400">
                      <ImageIcon className="w-3 h-3 mr-1" />
                      <span className="text-xs">사진 {Math.floor(Math.random() * 3) + 1}장</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2].map((_, index) => (
                        <div key={index} className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="facilities">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-green-600" />
                시설 안내
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {academy.facilities.map((facility, index) => {
                  const IconComponent = facilityIcons[facility] || BookOpen;
                  return (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <IconComponent className="w-4 h-4 text-green-600 mr-3" />
                      <span className="text-gray-900 text-sm">{facility}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-xs">
                  * 시설 견학을 원하시면 사전 예약 후 방문해 주시기 바랍니다.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <TeacherDetailDialog
        teacher={selectedTeacher}
        isOpen={isTeacherDialogOpen}
        onClose={() => setIsTeacherDialogOpen(false)}
      />

      <ReportDialog
        isOpen={isReportDialogOpen}
        onClose={() => setIsReportDialogOpen(false)}
        academyName={academy.name}
      />
    </div>
  );
};

export default AcademyDetail;
