
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SearchForm, { SearchFilters } from "@/components/SearchForm";
import CountUpAnimation from "@/components/CountUpAnimation";
import { mockAcademies } from "@/data/mockData";
import { Star, MapPin, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentAcademyIndex, setCurrentAcademyIndex] = useState(0);
  
  const rotatingTexts = [
    "국어학원",
    "수학학원", 
    "입시 소식",
    "입시 칼럼"
  ];

  // 핫한 학원들 (상위 3개)
  const hotAcademies = mockAcademies.slice(0, 3);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 1000);

    const academyInterval = setInterval(() => {
      setCurrentAcademyIndex((prev) => (prev + 1) % hotAcademies.length);
    }, 2000);

    return () => {
      clearInterval(textInterval);
      clearInterval(academyInterval);
    };
  }, []);

  const handleSearch = (filters: SearchFilters) => {
    const params = new URLSearchParams();
    if (filters.keyword) params.set('keyword', filters.keyword);
    if (filters.district && filters.district !== '전체') params.set('district', filters.district);
    if (filters.subject && filters.subject !== '전체') params.set('subject', filters.subject);
    
    navigate(`/academies?${params.toString()}`);
  };

  const stats = [
    { number: 1200, suffix: "+", label: "등록된 학원" },
    { number: 15000, suffix: "+", label: "수강생 후기" },
    { number: 98, suffix: "%", label: "만족도" },
    { number: 24, suffix: "/7", label: "지원 서비스" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      {/* 모바일 히어로 섹션 */}
      <section className="px-4 py-8 overflow-hidden">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
            정용준님{" "}
            <span 
              key={currentTextIndex}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 inline-block transition-all duration-500 ease-in-out transform animate-bounce-gentle"
            >
              {rotatingTexts[currentTextIndex]}
            </span>
            을<br />찾고 계신가요?
          </h1>
        </div>

        {/* 단일 검색바 */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <SearchForm onSearch={handleSearch} showAdvanced={false} />
        </div>

        {/* 핫한 학원 슬라이더 */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">🔥 지금 핫한 학원</h2>
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentAcademyIndex * 100}%)` }}
            >
              {hotAcademies.map((academy, index) => (
                <div key={academy.id} className="min-w-full bg-white p-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={academy.image} 
                      alt={academy.name}
                      className="w-20 h-20 rounded-xl object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{academy.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{academy.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-blue-500 mr-1" />
                          <span>{academy.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-green-500 mr-1" />
                          <span>{academy.studentCount}명</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 슬라이더 인디케이터 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {hotAcademies.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentAcademyIndex ? "bg-blue-600 w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 모바일 통계 카드 */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <CountUpAnimation
                end={stat.number}
                suffix={stat.suffix}
                className="text-2xl font-bold text-blue-600 mb-2"
                duration={2500 + index * 200}
              />
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 모바일 안내 섹션 */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg animate-fade-in" style={{ animationDelay: "1000ms" }}>
          <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
            🎯 맞춤형 학원 찾기
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span>지역별 학원 정보 제공</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span>실제 수강생 후기 확인</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
              <span>투명한 등록비 공개</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slide-down 0.4s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Index;
