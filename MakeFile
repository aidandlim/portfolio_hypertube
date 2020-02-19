NAME = Hypertube

GREEN_BOLD = \033[1;34m
WHITE_BOLD = \033[1;37m
YELLOW = \033[0;32m
UNDERLINE = \033[1;4;37m
RESET = \033[0;37m

all:
	@echo "usage:"
	@echo "\tmake start : to initialize $(NAME) application"
	@echo "\tmake end : to terminate $(NAME) application"

start:
	@echo ""
	@echo "\t$(GREEN_BOLD)CAMAGRU APP > $(WHITE_BOLD)Welcome! The server setting process is initializing.$(RESET)"
	@echo ""

	@echo "\t     [   ]  Initializing the $(UNDERLINE)Proxy API Server$(RESET).\c"
	@cd proxy && npm install --quiet --no-progress > /dev/null 2>&1
	@cd proxy && nohup npm start >/dev/null 2>&1 &
	@sleep 0.5
	@echo "\r\t     [ $(YELLOW)#$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "\t     [   ]  Initializing the $(UNDERLINE)Torrent API Server$(RESET).\c"
	@cd torrent && npm install --quiet --no-progress > /dev/null 2>&1
	@cd torrent && nohup npm start >/dev/null 2>&1 &
	@sleep 0.5
	@echo "\r\t     [ $(YELLOW)#$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "\t     [   ]  Initializing the $(UNDERLINE)Stream API Server$(RESET).\c"
	@cd stream && npm install --quiet --no-progress > /dev/null 2>&1
	@cd stream && nohup npm start >/dev/null 2>&1 &
	@sleep 0.5
	@echo "\r\t     [ $(YELLOW)#$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "\t     [   ]  Initializing the $(UNDERLINE)Socket API Server$(RESET).\c"
	@cd socket && npm install --quiet --no-progress > /dev/null 2>&1
	@cd socket && nohup npm start >/dev/null 2>&1 &
	@sleep 0.5
	@echo "\r\t     [ $(YELLOW)#$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "\t     [   ]  Initializing the $(UNDERLINE)Database API Server$(RESET).\c"
	@cd server && nohup java -jar api.jar >/dev/null 2>&1 &
	@sleep 0.5
	@echo "\r\t     [ $(YELLOW)#$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "\t     [   ]  Initializing the $(UNDERLINE)React Frontend Server$(RESET).\c"
	@cd socket && npm install --quiet --no-progress > /dev/null 2>&1
	@cd socket && nohup npm start >/dev/null 2>&1 &
	@sleep 0.5
	@echo "\r\t     [ $(YELLOW)#$(RESET) ]"
	@echo ""
	@sleep 0.5

	@echo "\t$(GREEN_BOLD)$(NAME) APP > $(WHITE_BOLD)It has been completed."
	@echo ""

end:
	@echo "Trying to terminate all $(NAME) application server :)"
	@sh Terminator.sh