// JavaScript Document
/*******************************************************************************
**
ADL SCORM 2004 4th Edition BKME 

The ADL SCORM 2004 4th Ed. BKME is licensed under

Creative Commons Attribution-Noncommercial-Share Alike 3.0 United States.

 

The Advanced Distributed Learning Initiative allows you to:

  *  Share - to copy, distribute and transmit the work.

  *  Remix - to adapt the work. 

 

Under the following conditions:

  *  Attribution. You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).

  *  Noncommercial. You may not use this work for commercial purposes. 

  *  Share Alike. If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one. 

 

For any reuse or distribution, you must make clear to others the license terms of this work. 

Any of the above conditions can be waived if you get permission from the ADL Initiative. 

Nothing in this license impairs or restricts the author's moral rights.
**
*******************************************************************************/

// Global variables

// Keep track of location in content by div number
var CurrentPage;
var current = 0;
var sections = document.getElementsByTagName('section');
var btnAnt = document.getElementById('btn-ant');
var counter = document.getElementById('counter');
var btnSig = document.getElementById('btn-sig');

// Track initialized status so it is only called once
var AlreadyInitialized = false;

/*******************************************************************************
**
** This function asks the LMS if there exists a previous SCO or Asset to go to.
** If a SCO or Asset exists, then the previous button is displayed.
**
** Inputs:  None
**
** Return:  String - "true" if the previous button should be displayed
**                   "false" if failed.
**
*******************************************************************************/
function RenderPreviousButton() {
	var value = retrieveDataValue("adl.nav.request_valid.previous");
	return value;
}

/*******************************************************************************
**
** This function asks the LMS if there exists a next SCO or Asset to continue
** to.  If a SCO or Asset exists, then the continue button is displayed.
**
** Inputs:  None
**
** Return:  String - "true" if the continue button should be displayed
**                   "false" if failed.
**
*******************************************************************************/
function RenderContinueButton() {
	var value = retrieveDataValue("adl.nav.request_valid.continue");
	return value;
}

/*******************************************************************************
**
** This function is used to go to a previous SCO
**
*******************************************************************************/
function PreviousSCO() {
	// we request the previous SCO from the LMS
	storeDataValue( "adl.nav.request", "previous" );
	// we terminate this SCO's communication with the LMS
	terminateCommunication();
}

/*******************************************************************************
**
** This function is used to go to a next SCO
**
*******************************************************************************/
function ContinueSCO() {
	// we request the previous SCO from the LMS
	storeDataValue( "adl.nav.request", "continue" );
	// we terminate this SCO's communication with the LMS
	terminateCommunication();
}

/*******************************************************************************
**
** This function is used to tell the LMS to initiate the communication session
** using the APIWrapper.js file as a pass through. It uses the global variable
** AlreadyInitialized so initialize is only called once.
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function CallInitialize(){
	if(!AlreadyInitialized){
		initializeCommunication();
		AlreadyInitialized = true;
	}
}

/*******************************************************************************
**
** This function sets the state of the sco.
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function Initialize() {
	// make initialize call
	CallInitialize();

	// set completion status to incomplete
	SetIncomplete();

	// set exit to suspended
	storeDataValue( "cmi.exit","suspend" );

	// check for resumed entry state
	var entryMode = retrieveDataValue( "cmi.entry" );

	// set a local variable to page 1
	// current = 0;

	// check whether resuming SCO
	if (entryMode == "resume") {
		// check if a prior location was set
		current = retrieveDataValue( "cmi.location" );
		// get the Error code from the last call
		var errorCode = retrieveLastErrorCode();

		// if not set or at the last page, go to first page
		if (errorCode == "403"  || current == TotalPages()) {
			current = 0;
		}
	}

	current = Number(current);
	counter.innerHTML = (current + 1) + " / " + sections.length;
	// present page to learner
	// DisplayPage( location );
	for (i=0; i < sections.length; i++){
		if(i === current) {
			sections[i].classList.remove('oculta');
			sections[i].classList.add('actual');
		} else {
			sections[i].classList.remove('actual');
			sections[i].classList.add('oculta');
		}
	}
	actualizar();
}

/*******************************************************************************
**
** This function is used to get the total number of pages (divs with the class
** "page") in the sco
**
** Inputs:  None
**
** Return:  String - total number of divs with the class name "page"
**
*******************************************************************************/
function TotalPages(){
	// initial setup of variables
	var pages = document.getElementsByTagName("section").length;
	return pages;
}


/*******************************************************************************
**
** Makes the appropriate calls for a normal exit calling Terminate
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function Terminate() {
	terminateCommunication();
}

/*******************************************************************************
**
** Sets the SCO completion status to incomplete.
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function SetIncomplete (){
	retrieveDataValue( "cmi.completion_status" );
	if (status != "completed"){
		storeDataValue( "cmi.completion_status", "incomplete" );
	}
}

/*******************************************************************************
**
** Sets the SCO completion status to complete.
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/

function SetComplete (){
	storeDataValue( "cmi.completion_status", "completed" );
}

/*******************************************************************************
**
** Shows and hides divs to create the appearance of paging through a sco.
**
** Inputs:  Int (or a String formatted as an Int) - div to display
**
** Return:  None
**
*******************************************************************************/
// function DisplayPage( pn )
// {
// 	pageNumber = parseInt(pn);


// 	// catch out of range pages

// 	if (pageNumber <1 || pageNumber > TotalPages()){
// 		pageNumber = 1;
// 	}

// 	//check and stop flash

// 	// if (SwfLoaded(document["swf" + CurrentPage ])) {
// 	//     document["swf" + CurrentPage ].GotoFrame(1);
// 	// }

// 	// set location value for bookmark
// 	storeDataValue( "cmi.location", pageNumber ) ;


// 	// set completion status to completed when the user hits the last page
// 	// check whether to display continue button at end of sco for navigation to next sco
// 	if ( pageNumber == TotalPages() ) {

// 		SetComplete();

// 		if ( RenderContinueButton() != "true") {
// 			document.getElementById("btn-ant").style.visibility = "hidden";
// 		}
// 	}
// 	else{
// 		document.getElementById("btn-sig").style.visibility = "visible";
// 	}

// 	// check whether to display previous button at beginning of sco for navigation to previous sco
// 	if ( pageNumber == 1 ) {
// 		if ( RenderPreviousButton() != "true") {
// 			document.getElementById("btn-ant").style.visibility = "hidden";
// 		}
// 	}
// 	else{
// 		document.getElementById("btn-ant").style.visibility = "visible";
// 	}

// 	// check and start flash
// 	if (SwfLoaded(document["swf" + pageNumber])) {
// 	    document["swf" + pageNumber].Play();
//  	}

// 	// set global page
// 	CurrentPage = pageNumber;

// }


/*******************************************************************************
**
** Navigation button continue function. Handles page to page and sco to sco navigation.
** (Buttons are hidden when sco to sco navigtion is not allowed.)
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
// function NextPage() {
// 	if (CurrentPage+1 <= TotalPages()){
// 		DisplayPage( CurrentPage + 1 )
// 	}
// 	else{
// 		ContinueSCO();
// 	}
// }

/*******************************************************************************
**
** Navigation button previous function. Handles page to page and sco to sco navigation.
** (Buttons are hidden when sco to sco navigtion is not allowed.)
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
// function PreviousPage() {
// 	if (CurrentPage-1 >= 1){
// 		DisplayPage( CurrentPage - 1 )
// 	}
// 	else{
// 		PreviousSCO();
// 	}
// }

// function setPagina(p) {
// 	CurrentPage = p;
// 	DisplayPage( CurrentPage );
// }

/*******************************************************************************
**
** Checks if Flash object is finished loading.
**
** Inputs:  Object - DOM Reference
**
** Return:  Boolean
**
*******************************************************************************/
// function SwfLoaded (swfRef) {
//   if (typeof(swfRef) != "undefined") {
//     return swfRef.PercentLoaded() == 100;
//   } else {
//     return false;
//   }
// }

/*******************************************************************************
**
** Hides and shows a div on a page.
** Used in the Tracking Model SCO for addtional information about keywords.
**
** Inputs:  Object - DOM Reference
**
** Return:  Void
**
*******************************************************************************/
// function SwitchMenu(divId)
// {
// var element = document.getElementById(divId);
// 	if(element.style.display != "block"){
// 		element.style.display = "block";
// 	}
// 	else{
// 		element.style.display = "none";
// 	}
// }

// Funciones nuevas


function salir() {
	storeDataValue( "cmi.location",current );
	storeDataValue( "cmi.exit","suspend" );
	Terminate();
}

function ant(){
	if (current > 0){
		sections[current].classList.remove('actual');
		sections[current].classList.add('oculta');
		current--;
		sections[current].classList.remove('oculta');
		sections[current].classList.add('actual');
		counter.innerHTML = (current + 1) + " / " + sections.length;
		actualizar();
		window.scrollTo(0,0);
		storeDataValue( "cmi.location", current ) ;
	}
}

function sig(){
	if (current < (sections.length - 1)){
		sections[current].classList.remove('actual');
		sections[current].classList.add('oculta');
		current++;
		sections[current].classList.remove('oculta');
		sections[current].classList.add('actual');
		counter.innerHTML = (current + 1) + " / " + sections.length;
		actualizar();
		window.scrollTo(0,0);
		storeDataValue( "cmi.location", current ) ;
	}
}

function goTo(e) {
		console.log(current);
		sections[current].classList.remove('actual');
		sections[current].classList.add('oculta');
		current = (e - 1);
		console.log(current);
		sections[current].classList.remove('oculta');
		sections[current].classList.add('actual');
		counter.innerHTML = (current + 1) + " / " + sections.length;
		actualizar();
		window.scrollTo(0,0);
		storeDataValue( "cmi.location", current ) ;
}

function actualizar() {
	if (current === 0){
		btnAnt.style.opacity = 0;
		btnAnt.style.pointerEvents = 'none';
	} else {
		btnAnt.style.opacity = 1;
		btnAnt.style.pointerEvents = 'auto';
	}
	if (current === (sections.length - 1)){
		btnSig.style.opacity = 0;
		btnSig.style.pointerEvents = 'none';
	} else {
		btnSig.style.opacity = 1;
		btnSig.style.pointerEvents = 'auto';
	}
	
}

