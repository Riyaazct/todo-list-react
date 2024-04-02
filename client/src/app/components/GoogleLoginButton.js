const navigate = (url) => {
  window.location.href = url;
};

const auth = async () => {
  const response = await fetch(
    "http://127.0.0.1:3100/api/auth/oauth/request",
    {
      method: "post",
    }
  );

  const data = await response.json();
  navigate(data.url);
  console.log({ data });
};

const GoogleLoginButton = () => {
  return (
    <div className="w-full">
      <button
        type="button"
        className="border-0"
        onClick={() => auth()}
      >
        <img
          src="/images/googleButtons/1x/btn.png"
          alt="google Sign In"
          width={"100px"}
          height={"100px"}
          className="lg:min-h-[50px]"
        />
      </button>
    </div>
  );
};

export default GoogleLoginButton;
