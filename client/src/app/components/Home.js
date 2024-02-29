import NewTask from "./NewTask";
import Tasks from "./Tasks";

const Home = () => {
  return (
    <div className="max-w-[90%] xl:max-w-[1200px] m-auto">
      <NewTask />

      <Tasks />
    </div>
  );
};

export default Home;
