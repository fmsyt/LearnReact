# なにごとも環境構築から

- [なにごとも環境構築から](#なにごとも環境構築から)
  - [Windows](#windows)
  - [Mac](#mac)

[node]: https://img.shields.io/badge/node-%3E%3D16.13.0-brightgreen

このリポジトリでは、![node]が必要です。


## Windows


Scoopを導入

```powershell
> Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
> irm get.scoop.sh | iex
```


Node.jsを導入

```powershell
> scoop install nodejs
Installing 'nodejs' (21.1.0) [64bit]
node-v21.1.0-win-x64.7z (17.3 MB) [===================================] 100%
Checking hash of node-v21.1.0-win-x64.7z ... ok.
Extracting node-v21.1.0-win-x64.7z ... done.
Linking ~\scoop\apps\nodejs\current => ~\scoop\apps\nodejs\21.1.0
Persisting bin
Persisting cache
Running post_install script...
'nodejs' (21.1.0) was installed successfully!
```

```powershell
> node -v
v21.1.0
```

## Mac

Homebrewを導入

```bash
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Node.jsを導入

```bash
$ brew install node
```

```bash
$ node -v
v21.1.0
```
