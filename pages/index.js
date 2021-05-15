import Head from 'next/head'
import MUIDataTable from "mui-datatables";
import Router from 'next/router';
import Link from 'next/link';

export default function Home({vehicles}) {
  const data = vehicles.map((vehicle)=>({
    ...vehicle,
    registration : `${vehicle.registrationNumber.state}-${vehicle.registrationNumber.rto}-${vehicle.registrationNumber.series}-${vehicle.registrationNumber.number}`
  }));
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "year",
      label: "Year",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "fuel",
      label: "Fuel",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "registration",
      label: "Registration",
      options: {
        filter: false,
        sort: true,
      },
    },
  ];
  const options = {
    filterType: "checkbox",
    download: false,
    print:false,
    selectableRows:'none',
    onRowClick: (rowData, rowMeta) => {let vehicleId = data[rowMeta.dataIndex].id;Router.push(`/vehicles/${vehicleId}`)},
  };
  return (
    <>
      <Head>
        <link rel="manifest" href="manifest.json"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <link rel="apple-touch-icon" href="icon-180x180.png"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="application-name" content="AuctionQuickView"/>
        <meta name="apple-mobile-web-app-title" content="AuctionQuickView"/>
        <meta name="theme-color" content="#0f0f0f"/>
        <meta name="msapplication-navbutton-color" content="#0f0f0f"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="msapplication-starturl" content="/"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      </Head>
      <MUIDataTable
        title={"Vehicles List"}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.API_IP}/api/Vehicle?index=0&limit=999`);
  const data = await res.json();
  return {
    props: {
      vehicles: data
    }
  }
}
