import './css/dashboard.css';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';

function DashboardScreenAWS() {

  return (
    <iframe
        width="960"
        height="720"
        src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/240067346498/dashboards/8251cb16-5ce5-4f3c-bd55-5554beff7bf6?directory_alias=quynhnk">
    </iframe>
  );
};

export default DashboardScreenAWS