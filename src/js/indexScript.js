import { DomeProjectData } from '../../uploads/360Projects/DomeProjectsDataList.js';

class indexScript {
    constructor(object) {
        const uploadLoc = "../../uploads";
        let selectedGroup;
        let groups = [];

        function GroupSelection_Click(link) {
            $("#Choose").hide();
            if ($(link)[0].className == "groupLinkselected") return;

            $(".groupLinkselected").removeClass("groupLinkselected").addClass("groupLinks");
            $(link)[0].className = "groupLinkselected";

            const tmp = [...DomeProjectData];
            tmp.forEach(item => {
                const g = document.getElementById("projectLink_" + item.group + "_" + item.project);
                if (item.group == link.id) {
                    $(g).show();
                } else {
                    $(g).hide();
                }
            });
        }

        function AddProjectGroup(group) {
            if (!groups.includes(group)) {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = "#";
                a.innerText = group;
                a.className = "groupLinks";
                a.id = group;
                li.appendChild(a);
                document.getElementById("ProjectGroupList").appendChild(li);
                a.addEventListener('click', function() { GroupSelection_Click(this); });
                groups.push(group);
            }
        }

        this.START = function() {
            DomeProjectData.forEach(item => {
                if (item.dataFile.includes("_private")) return;

                const group = item.group;
                const project = item.project;

                AddProjectGroup(group);

                let g = `${group}?${project}`.replace(/ /g, "%20");

                const li = document.createElement("li");
                li.className = "projectLinks";
                li.id = "projectLink_" + group + "_" + project;

                const a = document.createElement("a");
                a.href = "Dome.html?" + g;
                a.innerText = project;
                li.appendChild(a);

                document.getElementById("ProjectList").appendChild(li);
            });

            $("#Header:hidden").fadeIn(400, function() {
                $("#PROJECTS:hidden").fadeIn(600);
            });

            $(window).resize(function() {
                // Placeholder if needed later
            });

            console.log("COMPLETE");
        };
    }
}

export { indexScript };
