
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Users, TrendingUp, Star } from "lucide-react";
import Header from "@/components/Header";
import SearchForm, { SearchFilters } from "@/components/SearchForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (filters: SearchFilters) => {
    const params = new URLSearchParams();
    if (filters.keyword) params.set('keyword', filters.keyword);
    if (filters.district && filters.district !== '전체') params.set('district', filters.district);
    if (filters.subject && filters.subject !== '전체') params.set('subject', filters.subject);
    
    navigate(`/academies?${params.toString()}`);
  };

  const features = [
    {
      icon: BookOpen,
      title: "다양한 과목",
      description: "국어, 수학, 영어 등 모든 과목의 학원을 한번에 검색",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Users,
      title: "검증된 학원",
      description: "실제 수강생 후기와 평점으로 검증된 양질의 학원만 선별",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: TrendingUp,
      title: "입시 정보",
      description: "최신 입시 뉴스와 학습 전략으로 완벽한 입시 준비",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Star,
      title: "맞춤 추천",
      description: "지역과 과목별 필터링으로 나에게 딱 맞는 학원 찾기",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const stats = [
    { number: "1,200+", label: "등록된 학원" },
    { number: "15,000+", label: "수강생 후기" },
    { number: "98%", label: "만족도" },
    { number: "24/7", label: "지원 서비스" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      {/* 히어로 섹션 */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              학원 찾기가 이렇게
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                쉬워도 될까요?
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              정용준님 같은 수험생을 위한 맞춤형 학원 검색 플랫폼
              <br />
              검증된 학원 정보와 최신 입시 정보를 한번에 확인하세요
            </p>
          </div>

          {/* 검색 폼 */}
          <div className="mb-16">
            <SearchForm onSearch={handleSearch} />
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 학원메이트를 선택해야 할까요?
            </h2>
            <p className="text-xl text-gray-600">
              합리적인 비용으로 양질의 입시 준비를 가능하게 하는 4가지 이유
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            지금 바로 시작해보세요
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            수많은 학생들이 이미 학원메이트로 성공적인 입시 준비를 하고 있습니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
              onClick={() => navigate('/academies')}
            >
              학원 찾기
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3"
              onClick={() => navigate('/admission')}
            >
              입시 정보 보기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
