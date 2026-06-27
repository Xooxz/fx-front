import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import RateChart from "../pages/RateChart.tsx";
import EventLog from "../pages/EventLog.tsx";
import ServiceHealth from "../pages/ServiceHealth.tsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rates/chart" element={<RateChart />} />
          <Route path="monitoring/events" element={<EventLog />} />
          <Route path="monitoring/health" element={<ServiceHealth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
