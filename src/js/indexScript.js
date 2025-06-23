import { DomeProjectData } from '../../uploads/360Projects/DomeProjectsDataList.js'; // 

class indexScript {
	constructor() {
        console.log("indexScript constructor called."); // Debug: Constructor called 
		const uploadLoc = "../../uploads"; // 
		let groups = []; // 

		function baseName(str) { // 
			let base = new String(str).substring(str.lastIndexOf('/') + 1); //  
			if (base.lastIndexOf(".") !== -1) //         
				base = base.substring(0, base.lastIndexOf(".")); // 
			return base; // 
		}

		function GroupSelection_Click(link) { // 
			$("#Choose").hide(); // 
			if ($(link)[0].className === "groupLinkselected") return; // 

			$(".groupLinkselected").removeClass("groupLinkselected").addClass("groupLinks"); // 
			$(link).removeClass("groupLinks").addClass("groupLinkselected"); // 

			const tmp = [...DomeProjectData]; // 

			tmp.forEach(item => { // 
				let group = item.group; // 
				let project = item.project; // 
				let g = document.getElementById("projectLink_" + group + "_" + project); // 
				let h = document.getElementById("projectImageLink_" + group + "_" + project); // 
				if (group === link.id) { // 
					$(g).show(); // 
					if (h) $(h).show(); // 
				} else {
					$(g).hide(); // 
					if (h) $(h).hide(); // 
				}
			});
		}

		function AddProjectGroup(group) { // 
            console.log("Attempting to add group:", group); // Debug: Group being processed 
			if (!groups.includes(group)) { // 
                console.log("Adding new group:", group); // Debug: New group added 
				let li = document.createElement("li"); // 
				let a = document.createElement("a"); // 
				a.href = "#"; // 
				a.innerText = group; // 
				a.className = "groupLinks"; // 
				a.id = group; // 
				a.addEventListener('click', function () { // 
					GroupSelection_Click(this); // 
				});
				li.appendChild(a); // 
                const projectGroupListElement = document.getElementById("ProjectGroupList"); // Debug: Get element reference
                console.log("Target ProjectGroupList element:", projectGroupListElement); // Debug: Check if element exists
                if (projectGroupListElement) { // Ensure element exists before appending 
				    projectGroupListElement.appendChild(li); // 
                } else {
                    console.error("Error: Element with ID 'ProjectGroupList' not found in DOM.");
                }
				groups.push(group); // 
			} else {
                console.log("Group already exists:", group); // Debug: Group skipped as it exists 
            }
		}

		function ResizeProjectList() { // 
			// Placeholder in case you need future resizing logic 
		}

		this.START = function () {
            console.log("START method called."); // Debug: START method execution 
            console.log("DomeProjectData contents at START:", DomeProjectData); // Debug: Check array content 
            
			for (let i = 0; i < DomeProjectData.length; i++) { // 
                console.log(`Processing project ${i + 1}/${DomeProjectData.length}:`, DomeProjectData[i].project); // Debug: Loop progress 
				if (DomeProjectData[i].dataFile.includes("_private")) { // 
                    console.log("Skipping private project:", DomeProjectData[i].project); // Debug: Private project skipped 
                    continue; // 
                }

				let group = DomeProjectData[i].group; // 
				let project = DomeProjectData[i].project; // 

				AddProjectGroup(group); // 

				let g = encodeURIComponent(`${group}?${project}`); // 

				let li = document.createElement("li"); // 
				li.className = "projectLinks"; // 
				li.id = "projectLink_" + group + "_" + project; // 

				let a = document.createElement("a"); // 
				a.href = "Dome.html?" + g; // 
				a.innerText = project; // 

				li.appendChild(a); // 
                const projectListElement = document.getElementById("ProjectList"); // Debug: Get element reference 
                console.log("Target ProjectList element:", projectListElement); // Debug: Check if element exists 
                if (projectListElement) { // Ensure element exists before appending 
				    projectListElement.appendChild(li); // 
                    console.log("Appended project:", project, "to ProjectList."); // Debug: Successfully appended 
                } else {
                    console.error("Error: Element with ID 'ProjectList' not found in DOM for project:", project); // Error if element not found 
                }
			}

            // Note: imageBarList and related functions were not in the provided "last working code",
            // so they are not included in this updated version to avoid breaking what you provided.
            // If you need LoadImageBar back, you'll need to re-add its definition and the event listeners.
            // document.getElementById("ImageBar_RightButton").addEventListener('click', ImageBar_RightButton_Click);
            // document.getElementById("ImageBar_LeftButton").addEventListener('click', ImageBar_LeftButton_Click);
            // LoadImageBar(); // Re-enable if needed

			$("#Header:hidden").fadeIn(400, function () { // 
				$("#PROJECTS:hidden").fadeIn(600, function () { // 
					ResizeProjectList(); // 
				});
			});

			$(window).resize(function () { // 
				ResizeProjectList(); // 
			});

			console.log("COMPLETE: indexScript START function finished."); // Debug: Final completion log 
		};
	}
}

export { indexScript }; //
