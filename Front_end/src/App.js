import './assets/css/bootstrap.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { public_router } from './routers';
import { StoreProvider } from './store';

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <div className="App">
          <Routes>
            {public_router.map((route, index) => {
              let Layout = 'div';
              if (route.layout) Layout = route.layout;
              return <Route path={route.path} element={
                <Layout>
                  {route.element}
                </Layout>
              }
                key={index}
              />
            })}
          </Routes>
        </div>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
