export async function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: '/',
    },
  };
}

export default function Page() {
  return <></>;
}
