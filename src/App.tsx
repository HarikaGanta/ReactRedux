// import Axios from './Api/AxiosGet'
// import AxiosPost from './Api/AxiosPost'
// import Fetch from './Api/Fetch'
// import Swr from './Api/swr'
// import './App.css'

// function App() {


//   return (
//     <>
//       {/* <Fetch/> */}
//       {/* <Axios/> */}
//       {/* <AxiosPost/> */}
//       <Swr/>
//     </>
//   )
// }

// export default App

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDashboard from './Api/ProductDashBoard'

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductDashboard />
    </QueryClientProvider>
  );
}
