updev:
	sudo docker compose up --build -e REACT_APP_LINK=http://localhost:5050 -e REACT_APP_WS=ws://localhost:5050 -e REACT_APP_BOTLINK=https://t.me/Testxf_Bot

upbuild:
	sudo docker compose build --build-arg REACT_APP_LINK=http://localhost:5050 REACT_APP_WS=ws://localhost:5050 REACT_APP_BOTLINK=https://t.me/Testxf_Bot