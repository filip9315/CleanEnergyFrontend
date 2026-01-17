import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function EnergyMix() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://cleanenergybackend.onrender.com/energy-mix')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, []);

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', 
    '#82CA9D', '#A4DE6C', '#D0ED57', '#FFC658'
  ];

  const renderCustomLegend = (props) => {
    const { payload } = props;
    
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '10px', fontSize: '12px', textAlign: 'left' }}>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: entry.color, borderRadius: '50%', marginRight: '8px' }} />
            <span style={{ color: '#333', textTransform: 'capitalize' }}>
              {entry.value}: <span style={{ fontWeight: 'bold' }}>{entry.payload.value.toFixed(1)}%</span>
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        Loading energy mix data...
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Energy Mix</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px' }}>
        {data.map((dayData, index) => {
          const chartData = Object.entries(dayData.averageEnergyMix)
            .map(([name, value]) => ({ name, value }))
            .filter(item => item.value > 0);

          const startTime = new Date(dayData.startTime);
          const endTime = new Date(dayData.endTime);
          const durationMs = endTime - startTime;
          const isPartialDay = durationMs < 24 * 60 * 60 * 1000;

          return (
            <div key={index} style={{ width: '350px', height: '450px' }}>
              <h3 style={{ marginBottom: '5px' }}>{new Date(dayData.date).toLocaleDateString()}</h3>
              <p style={{ fontSize: '0.8rem', color: '#000000', margin: '0 0 10px 0', visibility: isPartialDay ? 'visible' : 'hidden' }}>
                  {startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
              <p style={{ margin: '5px 0' }}>Clean Energy: {dayData.cleanEnergyPercentage.toFixed(1)}%</p>
              <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                    <Legend content={renderCustomLegend} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
