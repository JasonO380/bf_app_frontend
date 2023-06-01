import * as React from "react";
import MainRoutes from "./routes/main-routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // const location = useLocation();
  // const history = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
    
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000); 
  // }, []);

  // useEffect(() => {
  //   const unlisten = history.listen(() => {
  //     setIsLoading(true);
  //   });

  //   return () => {
  //     unlisten();
  //   };
  // }, [history]);

  // if (isLoading) {
  //   return <SplashPage text="Loading gains" />;
  // }

    return (
        <Router>
          <Routes basename="/">
            <Route path="*" element={<MainRoutes />} />
          </Routes>
        </Router>
    );
}

export default App;
