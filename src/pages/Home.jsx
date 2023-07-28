const styles = {
  div: [
    'mt-20',
    'text-4xl',
    'text-center',
  ].join(' '),
  welcome: ['text-4xl', 'pb-32', 'text-blue-700','uppercase'].join(' '),
  title: ['text-2x1', 'text-green-600'].join(' '),
};

const Home = () => {
  return (
    <div className={styles.div}>
      <h2 className={styles.welcome}>Welcome to your Phonebook</h2>
      <h1 className={styles.title}>Please Log In or Register!</h1>
    </div>
  );
};

export default Home;