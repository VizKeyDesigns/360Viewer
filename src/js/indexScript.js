import { DomeProjectData } from '../../uploads/360Projects/DomeProjectsDataList.js';

class indexScript {
	constructor() {
		const uploadLoc = "../../uploads";
		let groups = [];

		function baseName(str) {
			let base = new String(str).substring(str.lastIndexOf('/') + 1); 
			if (base.lastIndexOf(".") !== -1)       
				base = base.substring(0, base.lastIndexOf("."));
			return base;
		}

		function GroupSelection_Click(link) {
			$("#Choose").hide();
			if ($(link)[0].className === "groupLinkselected") return;

			$(".groupLinkselected").removeClass("groupLinkselected").addClass("groupLinks");
			$(link).removeClass("groupLinks").addClass("groupLinkselected");

			const tmp = [...DomeProjectData];

			tmp.forEach(item => {
				let group = item.group;
				let project = item.project;
				let g = document.getElementById("projectLink_" + group + "_" + project);
				let h = document.getElementById("projectImageLink_" + group + "_" + project);
				if (group === link.id) {
					$(g).show();
					if (h) $(h).show();
				} else {
					$(g).hide();
					if (h) $(h).hide();
				}
			});
		}

		function AddProjectGroup(group) {
			if (!groups.includes(group)) {
				let li = document.createElement("li");
				let a = document.createElement("a");
				a.href = "#";
				a.innerText = group;
				a.className = "groupLinks";
				a.id = group;
				a.addEventListener('click', function () {
					GroupSelection_Click(this);
				});
				li.appendChild(a);
				document.getElementById("ProjectGroupList").appendChild(li);
				groups.push(group);
			}
		}

		function ResizeProjectList() {
			// Placeholder in case you need future resizing logic
		}

		this.START = function () {
			for (let i = 0; i < DomeProjectData.length; i++) {
				if (DomeProjectData[i].dataFile.includes("_private")) continue;

				let group = DomeProjectData[i].group;
				let project = DomeProjectData[i].project;

				AddProjectGroup(group);

				let g = encodeURIComponent(`${group}?${project}`);

				let li = document.createElement("li");
				li.className = "projectLinks";
				li.id = "projectLink_" + group + "_" + project;

				let a = document.createElement("a");
				a.href = "Dome.html?" + g;
				a.innerText = project;

				li.appendChild(a);
				document.getElementById("ProjectList").appendChild(li);
			}

			$("#Header:hidden").fadeIn(400, function () {
				$("#PROJECTS:hidden").fadeIn(600, function () {
					ResizeProjectList();
				});
			});

			$(window).resize(function () {
				ResizeProjectList();
			});

			console.log("COMPLETE");
		};
	}
}

export { indexScript };
