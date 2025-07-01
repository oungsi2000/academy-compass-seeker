
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import SearchForm, { SearchFilters } from "@/components/SearchForm";

const Index = () => {
  const navigate = useNavigate();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const rotatingTexts = [
    "국어학원",
    "수학학원", 
    "입시 소식",
    "입시 칼럼"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (filters: SearchFilters) => {
    const params = new URLSearchParams();
    if (filters.keyword) params.set('keyword', filters.keyword);
    if (filters.district && filters.district !== '전체') params.set('district', filters.district);
    if (filters.subject && filters.subject !== '전체') params.set('subject', filters.subject);
    
    navigate(`/academies?${params.toString()}`);
  };

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
              정용준님{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500">
                {rotatingTexts[currentTextIndex]}
              </span>
              을<br />찾고 계신가요?
            </h1>
          </div>

          {/* 검색 폼 */}
          <div className="mb-16">
            <SearchForm onSearch={handleSearch} />
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
    </div>
  );
};

export default Index;
