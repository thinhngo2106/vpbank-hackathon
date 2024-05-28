import './css/dashboard.css';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';

export default function DashboardScreen() {
  const dashboardRef = useRef([]);
  const [dashboardId, setDashboardId] = useState('8251cb16-5ce5-4f3c-bd55-5554beff7bf6');
  const [embeddedDashboard, setEmbeddedDashboard] = useState(null);
  const [dashboardUrl, setDashboardUrl] = useState(null);
  const [embeddingContext, setEmbeddingContext] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch("https://trrx9a6upg.execute-api.us-east-1.amazonaws.com/embed/anonymous-embed"
      ).then((response) => response.json()
      ).then((response) => {
        setDashboardUrl(response.EmbedUrl)
      })
    }, 10);
    return () => clearTimeout(timeout);
  }, []);

  const createContext = async () => {
    const context = await createEmbeddingContext();
    setEmbeddingContext(context);
  }

  useEffect(() => {
    if (dashboardUrl) { createContext() }
  }, [dashboardUrl])

  useEffect(() => {
    if (embeddingContext) { embed(); }
  }, [embeddingContext])

  const embed = async () => {

    const options = {
      url: dashboardUrl,
      container: dashboardRef.current,
      height: "500px",
      width: "600px",
    };

    const newEmbeddedDashboard = await embeddingContext.embedDashboard(options);
    setEmbeddedDashboard(newEmbeddedDashboard);
  };

  useEffect(() => {
    if (embeddedDashboard) {
      embeddedDashboard.navigateToDashboard(dashboardId, {})
    }
  }, [dashboardId])

  const changeDashboard = async (e) => {
    const dashboardId = e.target.value
    setDashboardId(dashboardId)
  }

  return (
        <>
        <span className="hljs-tag">&lt;&gt;</span><header>
        <h1>Embedded <i>QuickSight</i>: Build Powerful Dashboards in React</h1>
      </header><main>
            <p>Welcome to the QuickSight dashboard embedding sample page</p>
            <p>Please pick a dashboard you want to render</p>
            <div ref="{dashboardRef}">
            </div></main></>
    );
}