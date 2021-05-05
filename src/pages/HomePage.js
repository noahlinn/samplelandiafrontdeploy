const HomePage = () => {
    return (
        <div className = "home-div">
            <h1 className="home-header">sampleLandia</h1>
            <p>Welcome to sampleLandia. sampleLandia allows users to search the FreeSounds.com
                API and my personal sampleLandia API. On the search page type what you're looking for, 
                choose which API to search in, then submit. Clicking on a search result will bring 
                you to that samples page where you can save it to your profile and download it. Users 
                can submit their own samples to the sampleLandia API on the upload page. Currently we only accept .wav and .mp3 
                files. Samples that the user submitted will also appear on their profile page. 
            </p>

        </div>
    )
}
export default HomePage