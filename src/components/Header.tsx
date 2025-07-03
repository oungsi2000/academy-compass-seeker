import { MapPin, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // 메뉴가 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: "홈", path: "/" },
    { name: "학원 찾기", path: "/academies" },
    { name: "어디다녀 피드", path: "/feed" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-lg border-b sticky top-0 z-50 animate-slide-down">
      <div className="px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 animate-fade-in">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
            </div>
            <span className="text-xl font-bold">
              어디<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">다녀</span>
            </span>
          </Link>

          <button
            className="p-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 animate-spin" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* 모바일 전체화면 메뉴 - 헤더에서 내려오는 애니메이션 */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-white z-[99999] animate-slide-down">
            {/* 메뉴 헤더 */}
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
                </div>
                <span className="text-xl font-bold">
                  어디<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">다녀</span>
                </span>
              </div>
              <button
                className="p-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* 메뉴 네비게이션 */}
            <nav className="flex flex-col h-full bg-white">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-6 py-6 text-lg font-medium transition-all duration-300 border-b border-gray-100 ${
                    isActive(item.path)
                      ? "text-blue-600 bg-blue-50 border-l-4 border-l-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="animate-fade-in">{item.name}</div>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
