export const loadProfiles  = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "https://mzcc.s3.amazonaws.com/mzcc.json", false);
    request.send(null);
    const data = request.responseText;
    const jsonProfiles = JSON.parse(data).profiles;
    const profiles = [];
    for (let i = 0; i < jsonProfiles.length; i++) {
        const profile = jsonProfiles[i];
        const profileObject = {
            title : profile.title,
            cols : profile.cols,
            events : profile.events
        }
        profiles.push(profileObject);
    }
    return profiles;
}
