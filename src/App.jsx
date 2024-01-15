import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import Menu from "./Components/Menu";
import { darkTheme, lightTheme } from "./utils/Theme";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Video from "./Pages/Video";
import Sign from "./Components/Sign";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  background-color: ${({ theme }) => theme.bg};
  flex: 7;
`;
const Wrapper = styled.div``;
function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />

          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>} />
                  <Route path="signin" element={<Sign />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />

                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
