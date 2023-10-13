import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Extract age and salary data
  const ageData = data.map((employee) => employee.age);
  const salaryData = data.map((employee) => employee.salary);

  const chartData = {
    labels: data.map((employee) => `${employee.firstName} ${employee.lastName}`),
    datasets: [
      {
        label: 'Age',
        data: ageData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Salary',
        data: salaryData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="App">
      <h1>Employee Age and Salary Chart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.length === 0 ? (
          <p>No employee data available.</p>
        ) : (
          <div>
            <Bar data={chartData} options={chartOptions} />
          </div>
        )
      )}
    </div>
  );
}

export default App;
