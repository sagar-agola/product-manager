# Get the base image
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /src

# Copy the csproj and restore all of the nugets
COPY PM.Api/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish ProductManager.sln -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/sdk:5.0
WORKDIR /src
EXPOSE 80
COPY --from=build-env /src/out .
ENTRYPOINT ["dotnet", "PM.Api.dll"]