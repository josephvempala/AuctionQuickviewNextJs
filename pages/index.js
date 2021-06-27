import Head from 'next/head'
import MUIDataTable from "mui-datatables";
import Router from 'next/router';
import Link from 'next/link';

export default function Home({vehicles}) {

  const columns = [
    {
      name: "Name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Year",
      label: "Year",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Fuel",
      label: "Fuel",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "RegistrationNumber",
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
    onRowClick: (rowData, rowMeta) => {let vehicleId = vehicles[rowMeta.dataIndex]._id;Router.push(`/vehicles/${vehicleId}`)},
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
        data={vehicles}
        columns={columns}
        options={options}
      />
    </>
  );
}

export const getServerSideProps = async () => {
  let res;
  try {
    console.log(`fetching from ${process.env.SERVER_API_IP}`);
    res = await fetch(`${process.env.SERVER_API_IP}/api/vehicle?page=0&limit=999`);
  } catch (error) {
    console.log(error);
    return{
      props:{
        vehicles:[]
      }
    }
  }
  const data = await res.json();
  return {
    props: {
      vehicles: data
    }
  }
}
