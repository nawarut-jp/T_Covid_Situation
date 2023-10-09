import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../components/TableData";
import Input from "../components/Input";
import Chart from "../components/Chart";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
export default function Dashboard() {
  const [currentData, setCurrentData] = useState(0);
  const [covidData, setCovidData] = useState([]);
  const [covidAllData, setCovidAllData] = useState([]);
  const [chartData, setChartData] = useState({
    data: [],
    series: [],
  });
  const [payload, setPayload] = useState();
  const [txtMonth, setTxtMonth] = useState("");

  const tableAllHeader = [
    {
      index: "ลำดับ",
      date: "วันที่",
      cases: "Total Cases",
      deaths: "Deaths",
      recovered: "Recovered",
    },
  ];

  const tableHeader = [
    {
      index: "ลำดับ",
      country: "Country",
      cases: "Total Cases",
      newCases: "New Cases",
      deaths: "Deaths",
      newDeaths: "New Deaths",
      recovered: "Recovered",
      newRecovered: "New Recovered",
    },
  ];

  useEffect(() => {
    axios
      .get(`https://disease.sh/v3/covid-19/all`)
      .then((res) => {
        setCurrentData(res.data.cases);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `https://disease.sh/v3/covid-19/historical/all?lastdays=${
          payload?.search ? payload.search : "All"
        }`
      )
      .then((response) => {
        const data = response.data;
        const temp2 = [],
          dataChart = [],
          seriesChart = [];
        for (const [index, key] of Object.keys(data.cases).entries()) {
          const temp = [
            {
              value: index + 1,
              className: "text-center text-lg",
            },
            {
              value: formatDateEN(key),
              className: "text-center text-lg",
            },
            {
              value: formatNumber(data.cases[key]),
              className: "text-center text-lg",
            },
            {
              value: formatNumber(data.deaths[key]),
              className: "text-center text-lg",
            },
            {
              value: formatNumber(data.recovered[key]),
              className: "text-center text-lg",
            },
          ];
          temp2.push(temp);
          dataChart.push(formatDateEN(key));
          seriesChart.push(data.cases[key]);
        }
        var month = convertDateThai(
          Object.keys(data.cases)[Object.keys(data.cases).length - 1].split(
            "/"
          )[0]
        );
        // ดึงค่า name มาหาว่าเป็นเดือนอะไร
        setTxtMonth(month);
        setCovidAllData(temp2);
        setChartData({
          data: dataChart,
          series: seriesChart,
        });
      })
      .catch((err) => console.log(err));
  }, [payload?.search]);

  useEffect(() => {
    axios
      .get(`https://disease.sh/v3/covid-19/countries?sort=cases`)
      .then((response) => {
        const data = response.data;
        const temp2 = [];
        data.forEach((item, index) => {
          const temp = [
            {
              value: index + 1,
              className: "text-center text-lg",
            },
            {
              value: item.country,
              className: "text-center text-lg",
            },
            {
              value: formatNumber(item.cases),
              className: "text-center text-lg",
            },
            {
              value: formatNumber(item.todayCases),
              className: `text-center text-lg ${
                item.todayCases > 0 ? "bg-red-200" : "bg-transparent"
              }`,
            },
            {
              value: formatNumber(item.deaths),
              className: "text-center text-lg",
            },
            {
              value: formatNumber(item.todayDeaths),
              className: `text-center text-lg ${
                item.todayDeaths > 0 ? "bg-stone-200" : "bg-transparent"
              }`,
            },
            {
              value: formatNumber(item.recovered),
              className: "text-center text-lg",
            },
            {
              value: formatNumber(item.todayRecovered),
              className: `text-center text-lg ${
                item.todayRecovered > 0 ? "bg-green-200" : "bg-transparent"
              }`,
            },
          ];
          temp2.push(temp);
        });
        setCovidData(temp2);
      })
      .catch((err) => console.log(err));
  }, []);

  function formatNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  function formatDateEN(date) {
    var date1 = date.split("/")[1];
    var month = date.split("/")[0];
    var year = date.split("/")[2];
    var str = pad(date1) + "/" + pad(month) + "/20" + year;
    return str;
  }

  function pad(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
  }

  function convertDateThai(date) {
    var month = [
      "",
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    return month[date];
  }

  return (
    <div className="container	m-auto py-14 py-8 px-8">
      <label className="text-4xl flex items-center justify-center	">
        สถานการณ์โควิด 19
      </label>
      <div className="flex justify-center	">
        <Card>
          <label className="flex justify-center items-center my-12 mx-12 text-2xl text-zinc-600 max-md:my-6 max-md:mx-6">
            จำนวนคนติดโควิดทั่วโลกล่าสุด : {formatNumber(currentData) || 0} คน
          </label>
        </Card>
      </div>
      <Input
        label={
          "ค้นหาช่วงจำนวนวันย้อนหลังไม่เกิน 30 วัน (ปัจจุบันข้อมูลอัพเดตล่าสุดอยู่ที่เดือน" +
          txtMonth +
          ")"
        }
        placeholder={"กรุณาใส่ข้อมูลจำนวนวัน"}
        value={payload?.search}
        onChange={(e) => {
          console.log("e ,", typeof e.target.value);
          if (parseInt(e.target.value) < 31) {
            setPayload({ ...payload, search: e.target.value });
          } else {
            setPayload({ ...payload, search: "" });
          }
        }}
      />
      <Chart data={chartData} date={payload?.search || "30"} />
      <label className="text-gray-800 text-lg ">
        ข้อมูลสถาณการณ์โควิดทั่วโลก (ปัจจุบันข้อมูลอัพเดตล่าสุดอยู่ที่เดือน
        {txtMonth})
      </label>
      <Table data={covidAllData} header={tableAllHeader} />

      <hr />
      <div className="mt-7">
        <label className="text-gray-800 text-lg ">
          สถานการณ์ผู้ติดเชื้อโควิดทั่วโลก แบบรายประเทศ ล่าสุดวันที่{" "}
          {new Date().toLocaleDateString()}
        </label>
      </div>
      <Table data={covidData} header={tableHeader} />
    </div>
  );
}
