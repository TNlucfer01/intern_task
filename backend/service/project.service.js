const project=require("../model/project.model")

const createProject=async(projectData)=>{
    try{
        const newProject=await project.create(projectData);
        return newProject;
    }
    catch(err){
        throw err;
    }
}

const getProjectById=async(projectId)=>{
    try{
        const projectData=await project.findByPk(projectId);
        return projectData;
    }
    catch(err){
        throw err;
    }
}

const getAllProjects=async()=>{
    try{
        const projects=await project.findAll();
        return projects;
    }
    catch(err){
        throw err;
    }
}

const updateProjectById=async(projectId,projectData)=>{
    try{
        const projectToUpdate=await project.findByPk(projectId);
        if(!projectToUpdate){
            throw new Error("Project not found");
        }
        await projectToUpdate.update(projectData);
        return projectToUpdate;
    }
    catch(err){
        throw err;
    }
}

const deleteProjectById=async(projectId)=>{
    try{
        const projectToDelete=await project.findByPk(projectId);
        if(!projectToDelete){
            throw new Error("Project not found");
        }
        await projectToDelete.destroy();
        return true;
    }
    catch(err){
        throw err;
    }
}

module.exports={
    createProject,
    getProjectById,
    getAllProjects,
    updateProjectById,
    deleteProjectById
};
