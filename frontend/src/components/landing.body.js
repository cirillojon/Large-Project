function connectSpotify() {
  if (process.env.NODE_ENV === 'production') 
    return "https://accounts.spotify.com/authorize?client_id=abb24fee7b8443d3bab993fe8504fbab&response_type=code&redirect_uri=https://trendify-project.herokuapp.com/landing/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";  
  
  else 
    return "https://accounts.spotify.com/authorize?client_id=abb24fee7b8443d3bab993fe8504fbab&response_type=code&redirect_uri=http://localhost:3000/landing/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";    
}

function Body() {

  return (
    <section class="text-gray-700 body-font bg-[#20072e] py-20">
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Find out your most listened artist and more...
            </h1>
            <p class="mb-8 leading-relaxed text-white">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
            <div class="w-3/4 flex justify-center ml-auto mr-auto">
                <button class="tracking-wider w-full h-16 px-6 text-black transition-colors duration-150 bg-[#a247db] focus:shadow-outline text-white text-base font-bold py-2 px-3 rounded-full hover:bg-[#8239af] hover:text-black">DOWNLOAD APP</button>
            </div>
            <div class="w-3/4 flex justify-center mt-3 ml-auto mr-auto">
                <a class="tracking-wider w-full h-16 px-6 text-white text-base font-semibold py-2 px-3 transition-colors duration-150 bg-[#2ebd59] focus:shadow-outline hover:bg-[#259747] rounded-full" href={connectSpotify()}>Login With Spotify</a>
            </div>
            </div>
            <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img class="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600/edf2f7/a5afbd"></img>
            </div>
        </div>
    </section>
  );
};
  
export default Body;
