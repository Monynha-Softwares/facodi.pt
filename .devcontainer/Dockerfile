FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

RUN apt-get update && \
    apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    wget && \
    update-ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@10.9.2 && \
    rm -rf /var/lib/apt/lists/*

ARG HUGO_VERSION="0.148.1"
RUN wget --quiet "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz" && \
    tar xzf hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz && \
    rm -r hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz && \
    mv hugo /usr/local/bin && \
    chmod 755 /usr/local/bin/hugo

WORKDIR /src
COPY ./ /src
RUN npm install
