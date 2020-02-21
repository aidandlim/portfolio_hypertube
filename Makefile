NAME = HyperTube

GREEN_BOLD = \033[1;34m
WHITE_BOLD = \033[1;37m
YELLOW = \033[0;32m
UNDERLINE = \033[1;4;37m
RESET = \033[0;37m

all:
	@echo "usage:"
	@echo "\tmake start : to initialize $(NAME) application"
	@echo "\tmake end : to terminate $(NAME) application"
	@echo "\tmake check : to check environment variables of $(NAME) application"

start:
	@echo ""
	@echo "$(GREEN_BOLD)$(NAME) APP > $(WHITE_BOLD)Welcome! The server setting process is initializing.$(RESET)"
	@echo ""

	@echo "     [   ]  Initializing the $(UNDERLINE)Proxy API Server$(RESET).\c"
	@cd proxy && npm install --quiet --no-progress > /dev/null 2>&1
	@cd proxy && nohup npm start > /dev/null 2>&1 &
	@sleep 0.5
	@echo "\r     [ $(YELLOW)#$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "     [   ]  Initializing the $(UNDERLINE)Torrent API Server$(RESET).\c"
	@cd torrent && npm install --quiet --no-progress > /dev/null 2>&1
	@cd torrent && nohup npm start > /dev/null 2>&1 &
	@cd torrent && rm -rf public && mkdir public && cd public && mkdir sub
	@sleep 0.5
	@echo "\r     [ $(YELLOW)#$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "     [   ]  Initializing the $(UNDERLINE)Stream API Server$(RESET).\c"
	@cd stream && npm install --quiet --no-progress > /dev/null 2>&1
	@cd stream && nohup npm start > /dev/null 2>&1 &
	@sleep 0.5
	@echo "\r     [ $(YELLOW)#$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "     [   ]  Initializing the $(UNDERLINE)Socket API Server$(RESET).\c"
	@cd socket && npm install --quiet --no-progress > /dev/null 2>&1
	@cd socket && nohup npm start > /dev/null 2>&1 &
	@sleep 0.5
	@echo "\r     [ $(YELLOW)#$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "     [   ]  Initializing the $(UNDERLINE)Database API Server$(RESET).\c"
	@cd api && nohup java -jar api.jar > /dev/null 2>&1 &
	@sleep 0.5
	@echo "\r     [ $(YELLOW)#$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "     [   ]  Initializing the $(UNDERLINE)React Frontend Server$(RESET).\c"
	@cd client && npm install --quiet --no-progress > /dev/null 2>&1
	@cd client && nohup npm start > /dev/null 2>&1 &
	@sleep 0.5
	@echo "\r     [ $(YELLOW)#$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "$(GREEN_BOLD)$(NAME) APP > $(WHITE_BOLD)It has been completed.$(RESET)"
	@echo ""

end:
	@echo ""
	@echo "$(GREEN_BOLD)$(NAME) APP > $(WHITE_BOLD)Trying to terminate all $(NAME) application server$(RESET)"
	@echo ""
	@sh Terminator.sh
	@echo ""
	@echo "$(GREEN_BOLD)$(NAME) APP > $(WHITE_BOLD)It has been completed.$(RESET)"
	@echo ""

check:
	@echo ""
	@echo "$(GREEN_BOLD)$(NAME) APP > $(WHITE_BOLD)Initialize a Environment Checker$(RESET)"
	@echo ""
	@sh EnvironmentChecker.sh
	@echo ""
	@echo "$(GREEN_BOLD)$(NAME) APP > $(WHITE_BOLD)It has been completed.$(RESET)"
	@echo ""

apijs:
	vim client/src/constants/api.js

urljs:
	vim client/src/constants/url.js

packagejson:
	vim client/package.json