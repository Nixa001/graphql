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
    <div class="profilInfo logoutBtn">
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
                    <img src="./styles/assets/xpa.png" alt="" srcset="">

                    <h2 class="xp"></h2>

                </div>

                <div class="cart cart3">
                    <h3>Audits ratio</h3>
                    <img src="./styles/assets/ratios.png" alt="" srcset="">
                    <h2 class="ratio"></h2>

                </div>
                <div class="cart cart2">
                    <h3>Level</h3>
                    <svg id="doughnut-chart" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <!-- Cercle extérieur (anneau) -->
                      <circle cx="50%" cy="50%" r="30%" stroke="#ff993f50" stroke-width="2%" fill="none" />
                    
                      <!-- Arc représentant le niveau -->
                      <circle id="progress-circle" cx="0%" cy="50%" r="30%" stroke="#ff983f" stroke-width="5%" fill="none"
                        stroke-dasharray="0 251" 
                        stroke-dashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                    
                      <!-- Texte pour afficher le niveau -->
                      <text id="level-text" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="30px" fill="#e0e0e0">
                        0
                      </text>

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
        <h3>Best XP Projects Chart</h3> </div>
        <div class="sectionDiv2 div2SecondSection">
        <h3>Projects transaction</h3>

    <table class="content-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Project name</th>
        <th>XP</th>
        <th>State</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
        </div>
    </section>
    
</main>
    `)
}