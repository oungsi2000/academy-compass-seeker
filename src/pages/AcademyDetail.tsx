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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 뒤로가기 버튼 */}
        <div className="mb-6">
          <Link to="/academies">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              학원 목록으로
            </Button>
          </Link>
        </div>

        {/* 학원 기본 정보 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 학원 이미지 */}
            <div className="lg:w-1/3">
              <img 
                src={academy.image} 
                alt={academy.name}
                className="w-full h-64 lg:h-80 object-cover rounded-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>

            {/* 학원 정보 */}
            <div className="lg:w-2/3">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {academy.name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-yellow-500 bg-yellow-50 px-3 py-1 rounded-full">
                    <Star className="w-5 h-5 fill-current mr-1" />
                    <span className="font-medium">{academy.rating}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsReportDialogOpen(true)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Flag className="w-4 h-4 mr-1" />
                    신고
                  </Button>
                </div>
              </div>

              <p className="text-lg text-gray-600 mb-6">
                {academy.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                  <span>{academy.address}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3 text-green-600" />
                  <span>현재 수강생 {academy.studentCount}명</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-5 h-5 mr-3 text-emerald-600" />
                  <span>등록비 {academy.registrationFee?.toLocaleString() || 300000}원</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {academy.subjects.map((subject) => (
                  <Badge key={subject} variant="secondary">
                    {subject}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
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
            </div>
          </div>

          {/* 이벤트 정보 */}
          {academy.events.length > 0 && (
            <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
              <div className="flex items-center mb-2">
                <Gift className="w-5 h-5 text-red-600 mr-2" />
                <h3 className="font-bold text-red-700">진행중인 이벤트</h3>
              </div>
              <div className="space-y-1">
                {academy.events.map((event, index) => (
                  <p key={index} className="text-red-600">• {event}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 상세 정보 탭 */}
        <Tabs defaultValue="teachers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="teachers">강사진</TabsTrigger>
            <TabsTrigger value="curriculum">커리큘럼</TabsTrigger>
            <TabsTrigger value="reviews">수강생 후기</TabsTrigger>
            <TabsTrigger value="facilities">시설 정보</TabsTrigger>
          </TabsList>

          <TabsContent value="teachers">
            <TeacherSlider teachers={academy.teachers} onTeacherClick={handleTeacherClick} />
          </TabsContent>

          <TabsContent value="curriculum">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                  체계적인 학습 커리큘럼
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {academy.curriculum.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              {academy.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{review.studentName}</h4>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">{review.content}</p>
                    {/* 후기 사진 업로드 영역 */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-gray-400">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        <span className="text-sm">사진 {Math.floor(Math.random() * 3) + 1}장</span>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2].map((_, index) => (
                          <div key={index} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="facilities">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-green-600" />
                  학원 시설 안내
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {academy.facilities.map((facility, index) => {
                    const IconComponent = facilityIcons[facility] || BookOpen;
                    return (
                      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <IconComponent className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-gray-900">{facility}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    * 시설 견학을 원하시면 사전 예약 후 방문해 주시기 바랍니다.
                  </p>
                </div>
              </CardContent>
            </Card>
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
