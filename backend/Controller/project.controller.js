const projectService = require("../service/project.service");

async function getProjectById(req, res) {
    try {
        const projectId = req.params.id;
        const projectData = await projectService.getProjectById(projectId);
        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getAllProject(req,res){
    try{
        const projects=await projectService.getAllProjects();
        res.status(200).json(projects);

    }
    catch(err){
        res.status(500).json({error:err.message});
    }

}

async function createProject(req, res) {                      
      try {                                                       
        const projectData = {                                     
          ...req.body,                                            
          createdBy: req.user.id, // Cannot be spoofed            
        };                                                        
        const newProject = await                                  
        projectService.createProject(projectData);                
        res.status(201).json(newProject);                         
      } catch (err) {                                             
        res.status(err.statusCode || 500).json({ error:           
        err.message });                                           
      }                                                           
    } 

async function updateProject(req, res) {
    try {
        const projectId = req.params.id;
        const projectData = req.body;
        const updatedProject = await projectService.updateProjectById(projectId, projectData);
        if (!updatedProject) {                                                                               
          return res.status(404).json({ error: "Project not found" });                                
        } 
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteProject(req, res) {
    try {
        const projectId = req.params.id;
        const deleted = await projectService.deleteProjectById(projectId);
        if (deleted) {
            res.status(200).json({ message: "Project deleted successfully" });
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}
module.exports={
    updateProject,
    getProjectById,
    getAllProject,
    createProject,
    deleteProject
}
