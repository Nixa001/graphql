export const profilePage = () => {
    let html
    return (html = `

    <header class="headerDiv">
    <div class="profilInfo">
        <img src="./styles/assets/profil.jpg" alt="" srcset="">
        <h3 class="fullnameUser"> <span class="username"></span></h3>
    </div>
    <div class="profilInfo">
        <img src="./styles/assets/senegalIcon.png" alt="" srcset="">
        <h3 class="campus">Dakar</h3>
    </div>
    <div class="profilInfo">
        <img src="./styles/assets/logout.png" alt="" srcset="">
        <h3 class="logout">Logout</h3>
    </div>
</header>
<main>
    <section class="firstSection">
        <div class="sectionDiv div1FirstSection">
            <!-- <h2>Lorem ipsum dolor sit</h2>
            <h3>Lorem ipsum dolor</h3> -->
            <div class="contentDiv1">
                <div class="cart cart1">
                    <h3>XP</h3>
                    <h2 class="xp"></h2>

                </div>
                <div class="cart cart2">
                    <h3>Level</h3>
                    <h2 class="level"></h2>

                </div>
                <div class="cart cart3">
                    <h3>Audits ratio</h3>
                    <h2 class="ratio"></h2>

                </div>
            </div>
        </div>
        <div class="sectionDiv2 div2FirstSection">
        <h3> Best skills</h3>
        <svg width="500" height="500" id="radar-chart"></svg>
       </div>
    </section>
    <section class="secondSection">
        <div class="sectionDiv div1SecondSection">
        <h3>Graph projects XP</h3> </div>
        <div class="sectionDiv2 div2SecondSection">
        <h3>Other</h3>
        </div>
    </section>
    
</main>
    `)
}