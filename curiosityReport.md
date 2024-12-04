# Curiosity Report  

## Docker  
<br>

### What is Docker?  
Docker is a software that packages applications into containers that contain everything needed for the application to run. That way hosts (users) don’t have to worry about having anything downloaded on their host machine because everything is included in the Docker container. This is also nice for developers because each developer will be writing code locally. Using Docker, each developer is using a container from the same image, so they are all working on exactly the same code.  
<br>

### Containers  
Docker containers are built from the Docker image. Docker containers are run on the host machine, but are quite isolated. With regard to the OS, the container will use the host OS. This means that containers created from a Docker image made from a Linux machine will only run on a Linux OS. However, if the host machine has Docker Desktop installed, Docker Desktop uses a lightweight Linux virtual machine under the hood, which allows the Linux containers to be run on macOS or Windows operating systems. 

<br>


### Images  
An image is a template with instructions for creating a Docker container. Often, images are based on other images adding customizations. Images are based off of the computer's operating system.  
<br>

### Desktop Application  
You can use the Docker Desktop application to manage the containers in your registry. When you are running a container, you can open it there, view any logs, pause or resume the container, and much more. Docker desktop also runs a Linux VM under the hood to allow MacOS and Windows operating systems to run linux based containers. 

### Basic Docker Commands
- docker run
    - starts a new docker container from an image in your system
- docker ps
    - lists all the running docker containers
- docker strop
    - stops a running container
- docker rm
    - removes a docker container
- docker images
    - lists all docker images in your local system
- docker pull
    - downloads a docker image from a registry to your system
- docker exec
    - execuses a command in a running container
- docker-compose up
    - runs a set of command configured in a YAML file
- docker search
    - searches the docker hub for a particular image
- docker restart
    - restarts a stopped container
- docker kill
    - kills a container immediately. Docker stop shuts down a container eventually, but docker kill does it immediately
- docker login
    - command to login to the docker hub
- docker commit
    - create or save an image of the edited container on the local system
- docker push
    - pushes a image from your local system to the docker hub


