export function renderArtifactCards(artifacts, onSelect) {
    const container = document.getElementById("artifact-list");
    if (!container) return;
    container.innerHTML = "";

    artifacts.forEach((artifact, index) => {
        const card = document.createElement("button");
        card.className = "artifact-card";
        card.dataset.id = artifact.id;
        card.innerHTML = `
            <div class="card-top">
                <span class="card-number">${artifact.number || String(index + 1).padStart(2, "0")} / ${String(artifacts.length).padStart(2, "0")}</span>
                <span class="card-status">${artifact.status}</span>
            </div>
            <h4>${artifact.name}</h4>
            <p>${artifact.location} · ${artifact.mission}</p>
            <span class="card-link">EXPLORE ARTIFACT ↗</span>`;
        card.addEventListener("click", () => onSelect(artifact));
        container.appendChild(card);
    });
}

export function showArtifactPanel(artifact) {
    const panel = document.getElementById("artifact-panel");
    const overlay = document.getElementById("panel-overlay");
    const content = document.getElementById("artifact-content");
    if (!panel || !overlay || !content) return;

    const lat = Number(artifact.latitude);
    const lon = Number(artifact.longitude);
    const latitudeText = `${Math.abs(lat).toFixed(4)}° ${lat < 0 ? "S" : "N"}`;
    const longitudeText = `${Math.abs(lon).toFixed(4)}° ${lon < 0 ? "W" : "E"}`;

    const events = artifact.timeline || [
        { date: artifact.date, title: "Mission milestone", detail: artifact.science }
    ];
    const timeline = events.map((event, index) => `
        <div class="story-event">
            <span class="story-event-index">${String(index + 1).padStart(2, "0")}</span>
            <div><span class="story-event-date">${event.date}</span>
            <h5>${event.title}</h5><p>${event.detail}</p></div>
        </div>`).join("");

    content.innerHTML = `
        <img class="artifact-image" src="${artifact.image}" alt="${artifact.name}"
             onerror="this.onerror=null;this.src='https://placehold.co/900x500/151820/d7b77a?text=Mission+Archive'">
        <div class="panel-kicker">${artifact.mission} · ${artifact.date}</div>
        <h2 class="panel-title">${artifact.name}</h2>
        <p class="panel-description">${artifact.description}</p>

        <div class="panel-meta">
            <div class="meta-box"><span>LOCATION</span><strong>${artifact.location}</strong></div>
            <div class="meta-box"><span>STATUS</span><strong>${artifact.status}</strong></div>
            <div class="meta-box"><span>LATITUDE</span><strong>${latitudeText}</strong></div>
            <div class="meta-box"><span>LONGITUDE</span><strong>${longitudeText}</strong></div>
        </div>

        <div class="panel-section story-intro">
            <h4>THE STORY</h4>
            <h3>${artifact.storyTitle || "A legacy on another world"}</h3>
            <p>${artifact.story || artifact.description}</p>
            <span class="creative-note">ILLUSTRATIVE FIRST-PERSON NARRATION · BASED ON DOCUMENTED MISSION HISTORY</span>
        </div>

        <div class="panel-section"><h4>01 — THE MISSION & SCIENCE</h4><p>${artifact.science}</p></div>
        ${artifact.whyLeft ? `<div class="panel-section"><h4>02 — WHY IT REMAINS</h4><p>${artifact.whyLeft}</p></div>` : ""}
        <div class="panel-section"><h4>03 — THE SCIENTIFIC LEGACY</h4><p>${artifact.legacy}</p></div>

        <div class="panel-section timeline-section">
            <h4>MISSION TIMELINE</h4>
            <div class="story-timeline">${timeline}</div>
        </div>
        <div class="panel-section">
            <h4>MISSION SOURCE</h4>
            <a class="source-link" href="${artifact.source}" target="_blank" rel="noopener noreferrer">VIEW NASA MISSION RESOURCES ↗</a>
        </div>`;

    panel.classList.add("open");
    overlay.classList.add("open");
    document.querySelectorAll(".artifact-card").forEach((card) => {
        card.classList.toggle("selected", card.dataset.id === artifact.id);
    });
}

export function closeArtifactPanel() {
    document.getElementById("artifact-panel")?.classList.remove("open");
    document.getElementById("panel-overlay")?.classList.remove("open");
    document.querySelectorAll(".artifact-card").forEach((card) => card.classList.remove("selected"));
}
