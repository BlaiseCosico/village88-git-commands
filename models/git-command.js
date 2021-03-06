class GitCommand {
    constructor(working_directory){
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    status(){        
        /*
            For assignment #1:
            Create logic here and run unit testing.
        */

        let count = Object.keys(this.working_directory.new_changes).length;
        console.log("count is : " +count);

        if(count){
            let files = [];
            for (const [key, value] of Object.entries(this.working_directory.new_changes)) {
                console.log(`${key}: ${value}`);
                files.push(key);
              }
            console.log("files are " + files.join('\n'));
            return 'You have '+ count + ' change/s.\n'+files.join('\n');
        }
        
        return 'You have 0 change/s.\n';
        
    }

    test(){
        return true;
    }

    //Command: git add <filename/file directory/wildcard> 
    add(path_file){
        let modified_files = this.working_directory.new_changes;
        
        if(modified_files[path_file]){
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
        }
        /*
            For assignment #2:
            Create logic here and run unit testing.
            Don't forget to uncomment the unit tests.
        */
        else{
            return `Failed to add ${path_file}! File is not modified or missing.`;
        }
        return "Successfully added as index file/s.";
    }

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;