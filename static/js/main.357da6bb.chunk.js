(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{194:function(e,t,a){e.exports=a(354)},199:function(e,t,a){},217:function(e,t,a){},350:function(e,t,a){},351:function(e,t,a){},352:function(e,t,a){},354:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(45),i=a.n(r),s=(a(199),a(20)),o=a(21),c=a(25),d=a(22),u=a(15),h=a(24),g=a(48),m=a.n(g),v="https://damp-garden-93707.herokuapp.com/",b="getlistofagents",f="getdurationrange",C="getfilteredcalls",p="getcalllist",S="getlistoflabels",E="applyLabels",k="a12345";function y(e,t){return m.a.post("".concat(v).concat(E),{operation:{callList:e,label_ops:t}},{headers:{user_id:k}})}var O=a(364),_=(a(217),a(363)),j=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).state={agents:[],loading:!1,error:!1},a.onAgentSelected=a.onAgentSelected.bind(Object(u.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({loading:!0}),m.a.get("".concat(v).concat(b)).then(function(t){e.setState({loading:!1,agents:t.data.data.listofagents})})}},{key:"onAgentSelected",value:function(e,t){var a=this.props.onAgentSelected;a&&a(t.value)}},{key:"createOptions",value:function(){return this.state.agents.map(function(e){return{key:e,text:e,value:e}})}},{key:"renderAgentsList",value:function(){var e=this.state,t=e.loading,a=e.error;return t?"Loading agents list...":a?"There was an error in loading agents list":l.a.createElement(_.a,{placeholder:"Select Agents",fluid:!0,multiple:!0,search:!0,selection:!0,options:this.createOptions(),onChange:this.onAgentSelected})}},{key:"render",value:function(){return this.renderAgentsList()}}]),t}(l.a.Component),w=a(360),L=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).state={loading:!1,error:!1,duration:{},radioValue:"long"},a.onDurationSelected=a.onDurationSelected.bind(Object(u.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"onDurationSelected",value:function(e,t){var a=this.props.onDurationSelected;this.setState({radioValue:t.value}),a&&a(this.getSelectedDuration())}},{key:"getSelectedDuration",value:function(){var e=this.state.radioValue,t=this.getDurationArray();return"short"===e?[t[0],t[1]]:"medium"===e?[t[0],t[2]]:[t[0],t[3]]}},{key:"componentDidMount",value:function(){var e=this,t=this.props.onDurationSelected;this.setState({loading:!0}),m.a.get("".concat(v).concat(f)).then(function(a){e.setState({loading:!1,duration:a.data.data}),t&&t(e.getSelectedDuration())})}},{key:"getDurationArray",value:function(){var e=this.state.duration,t=Math.round(e.minimum),a=Math.round(e.maximum);return[t,(a-t)/4,3*(a-t)/4,a]}},{key:"renderDurationRange",value:function(){var e=this.state,t=e.loading,a=e.error;if(t)return"Loading duration list...";if(a)return"There was an error in loading duration";var n=this.getDurationArray();return l.a.createElement(l.a.Fragment,null,l.a.createElement(w.a,{radio:!0,radioGroup:"duration",checked:"short"===this.state.radioValue,label:"Short (".concat(n[0]," - ").concat(n[1],")"),value:"short",onChange:this.onDurationSelected}),l.a.createElement(w.a,{radio:!0,radioGroup:"duration",checked:"medium"===this.state.radioValue,label:"Medium (".concat(n[0]," - ").concat(n[2],")"),value:"medium",onChange:this.onDurationSelected}),l.a.createElement(w.a,{radio:!0,radioGroup:"duration",checked:"long"===this.state.radioValue,label:"Long (".concat(n[0]," - ").concat(n[3],")"),value:"long",onChange:this.onDurationSelected}))}},{key:"render",value:function(){return this.renderDurationRange()}}]),t}(l.a.Component),P=a(362),A=a(361),D=a(177),R=a.n(D),F=function(e){function t(e){var a;Object(s.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).handleSort=function(e){return function(){var t=a.state,n=t.column,l=t.paginatedCalls,r=t.direction;n===e?a.setState({paginatedCalls:l.reverse(),direction:"ascending"===r?"descending":"ascending"}):a.setState({column:e,paginatedCalls:R.a.sortBy(l,[e]),direction:"ascending"})}};return a.state={pageSize:10,totalPages:Math.ceil(e.calls.length/10),currentPage:0,loading:!1,error:!1,calls:e.calls,paginatedCalls:e.calls.slice(0,10),column:null,direction:null},a.onPageChange=a.onPageChange.bind(Object(u.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"onPageChange",value:function(e,t){var a=this.state,n=a.calls,l=a.pageSize;console.log(t);var r=t.activePage,i=n.slice((r-1)*l,r*l);this.setState({currentPage:t.activePage,paginatedCalls:i});var s=this.props.onPageChange;s&&s(t.activePage)}},{key:"renderHeader",value:function(){var e=this.state,t=e.direction,a=e.column;return l.a.createElement(P.a.Row,null,l.a.createElement(P.a.HeaderCell,{sorted:"agent_id"===a?t:null,onClick:this.handleSort("agent_id")},"Agent Id"),l.a.createElement(P.a.HeaderCell,{sorted:"call_id"===a?t:null,onClick:this.handleSort("call_id")},"Call Id"),l.a.createElement(P.a.HeaderCell,{sorted:"call_time"===a?t:null,onClick:this.handleSort("call_time")},"Call Time"))}},{key:"renderFooter",value:function(){var e=this.state,t=e.totalPages,a=e.currentPage;return l.a.createElement(P.a.Row,null,l.a.createElement(P.a.HeaderCell,{colSpan:"3"},l.a.createElement(A.a,{totalPages:t,activePage:a,onPageChange:this.onPageChange})))}},{key:"render",value:function(){var e=this.state.paginatedCalls;return l.a.createElement(P.a,{sortable:!0},l.a.createElement(P.a.Header,null,this.renderHeader()),l.a.createElement(P.a.Body,null,e.map(function(e){return l.a.createElement(P.a.Row,{key:e.call_id},l.a.createElement(P.a.Cell,null," ",e.agent_id," "),l.a.createElement(P.a.Cell,null," ",e.call_id),l.a.createElement(P.a.Cell,null," ",e.call_time," "))})),l.a.createElement(P.a.Footer,null,this.renderFooter()))}}]),t}(l.a.Component),N=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).state={loading:!1,error:!1,calls:[],selectedAgents:[],selectedDuration:[],enabled:!1},a.onDurationSelected=a.onDurationSelected.bind(Object(u.a)(a)),a.onAgentSelected=a.onAgentSelected.bind(Object(u.a)(a)),a.getFilteredCalls=a.getFilteredCalls.bind(Object(u.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"onAgentSelected",value:function(e){this.setState({selectedAgents:e}),this.setState({enabled:this.isEnabled(e,this.state.selectedDuration)})}},{key:"onDurationSelected",value:function(e){this.setState({selectedDuration:e}),this.setState({enabled:this.isEnabled(this.state.selectedAgents,e)})}},{key:"getFilteredCalls",value:function(){var e=this,t=this.state.reloadSwitch;this.setState({loading:!0});var a,n,l=this.state,r=l.selectedAgents,i=l.selectedDuration;(a=r,n=i,m.a.post("".concat(v).concat(C),{info:{filter_agent_list:a,filter_time_range:n}})).then(function(a){e.setState({loading:!1,calls:a.data.data}),t?e.setState({reloadSwitch:0}):e.setState({reloadSwitch:1})})}},{key:"renderCallsList",value:function(){var e=this.state,t=e.calls,a=e.reloadSwitch,n=e.loading,r=e.error;return n?"Loading calls list...":r?"There was an error loading calls list":t.length?l.a.createElement(F,{calls:t,key:a}):null}},{key:"isEnabled",value:function(e,t){return e.length>0&&t.length>0}},{key:"render",value:function(){var e=this.state,t=e.loading,a=e.error,n=e.calls,r=e.enabled,i="FilteredCalls";return(t||a||n.length)&&(i="FilteredCalls FilteredCalls--sidebar"),l.a.createElement("div",{className:i},l.a.createElement("div",{className:"FilteredCalls__criteria"},l.a.createElement("div",{className:"FilteredCalls__criteria-list"},l.a.createElement("div",{className:"FilteredCalls__agentsList"},l.a.createElement("div",{className:"FilteredCalls__criteria-title"},"Select agents"),l.a.createElement(j,{onAgentSelected:this.onAgentSelected})),l.a.createElement("div",{className:"FilteredCalls__duration"},l.a.createElement("div",{className:"FilteredCalls__criteria-title"},"Select duration"),l.a.createElement(L,{onDurationSelected:this.onDurationSelected}))),l.a.createElement("div",{className:"FilteredCalls__actions"},l.a.createElement(O.a,{onClick:this.getFilteredCalls,disabled:!r},"Get Filtered Calls"))),l.a.createElement("div",{className:"FilteredCalls__calls"},this.renderCallsList()))}}]),t}(l.a.Component),H=(a(350),a(65)),T=a(41),M=a(121),I=a(183),z=a(89),V=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).state={pageSize:10,totalPages:0,currentPage:e.initialPage,loading:!1,error:!1,calls:[],paginatedCalls:[],selectedCalls:[]},a.onPageChange=a.onPageChange.bind(Object(u.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.state,a=t.pageSize,n=t.currentPage;this.setState({loading:!0}),m.a.get("".concat(v).concat(p),{headers:{user_id:k}}).then(function(t){var l=t.data.data.call_data;e.setState({loading:!1,calls:l,paginatedCalls:l.slice((n-1)*a,n*a),totalPages:Math.ceil(l.length/a)})})}},{key:"onLabelRemove",value:function(e,t){}},{key:"onLabelAdd",value:function(e,t){}},{key:"renderLabels",value:function(e,t){return t.map(function(e){return l.a.createElement(z.a,{key:e},e)})}},{key:"getSelectedCallIds",value:function(e){return e.filter(function(e){return!0===e.selected}).map(function(e){return e.call_id})}},{key:"onRowToggle",value:function(e,t){console.log("selected row: ",t,e);var a=this.state.calls;a.filter(function(e){return e.call_id===t.call_id})[0].selected=e.checked,this.setState({calls:Object(I.a)(a)});var n=this.props.onRowsToggle;n&&n(this.getSelectedCallIds(a))}},{key:"onAllRowsToggle",value:function(e){console.log("All rows selected:",e);var t=this.state,a=t.calls,n=t.pageSize,l=t.currentPage,r=a.map(function(t,a){return a>=(l-1)*n&&a<l*n?Object(M.a)({},t,{selected:e.checked}):Object(M.a)({},t)}),i=r.slice((l-1)*n,l*n);this.setState({calls:r,paginatedCalls:i});var s=this.props.onRowsToggle;s&&s(this.getSelectedCallIds(r))}},{key:"renderRow",value:function(e){var t=this;return l.a.createElement(P.a.Row,{key:e.call_id},l.a.createElement(P.a.Cell,null,l.a.createElement(w.a,{checked:e.selected,onChange:function(a,n){return t.onRowToggle(n,e)}})),l.a.createElement(P.a.Cell,null,e.call_id),l.a.createElement(P.a.Cell,null,this.renderLabels(e.call_id,e.label_id)))}},{key:"renderHeader",value:function(){var e=this;return l.a.createElement(P.a.Header,null,l.a.createElement(P.a.Row,null,l.a.createElement(P.a.HeaderCell,null,l.a.createElement(w.a,{onChange:function(t,a){return e.onAllRowsToggle(a)}})),l.a.createElement(P.a.HeaderCell,null,"Call Id"),l.a.createElement(P.a.HeaderCell,null,"Labels")))}},{key:"onPageChange",value:function(e,t){var a=this.state,n=a.calls,l=a.pageSize;console.log(t);var r=t.activePage,i=n.slice((r-1)*l,r*l);this.setState({currentPage:t.activePage,paginatedCalls:i});var s=this.props.onPageChange;s&&s(t.activePage)}},{key:"renderFooter",value:function(){var e=this.state,t=e.totalPages,a=e.currentPage;return l.a.createElement(A.a,{totalPages:t,activePage:a,onPageChange:this.onPageChange})}},{key:"renderCallsList",value:function(){var e=this,t=this.state,a=t.loading,n=t.error,r=t.paginatedCalls;return a?"Loading Calls list...":n?"There was an error loading calls list":l.a.createElement(P.a,{celled:!0},this.renderHeader(),l.a.createElement(P.a.Body,null,r.map(function(t){return e.renderRow(t)})),l.a.createElement(P.a.Footer,null,l.a.createElement(P.a.Row,null,l.a.createElement(P.a.HeaderCell,{colSpan:"3"},this.renderFooter()))))}},{key:"render",value:function(){return l.a.createElement("div",{className:"LabelledCallsList"},this.renderCallsList())}}]),t}(l.a.Component),x=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).state={loading:!1,error:!1,labels:[]},a.onLabelsSelected=a.onLabelsSelected.bind(Object(u.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({loading:!0}),m.a.get("".concat(v).concat(S),{headers:{user_id:k}}).then(function(t){e.setState({loading:!1,labels:t.data.data.unique_label_list})})}},{key:"createOptions",value:function(){return this.state.labels.map(function(e){return{key:e,text:e,value:e}})}},{key:"onLabelsSelected",value:function(e,t){var a=this.props.onLabelsSelected;a&&a(t.value)}},{key:"renderLabels",value:function(){var e=this.state,t=e.loading,a=e.error;return t?"Loading Labels list...":a?"There was an error fetching labels list":l.a.createElement(_.a,{placeholder:"Select Labels",fluid:!0,multiple:!0,search:!0,selection:!0,options:this.createOptions(),onChange:this.onLabelsSelected})}},{key:"render",value:function(){return this.renderLabels()}}]),t}(l.a.Component),B=(a(351),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).state={selectedCalls:[],selectedLabels:[],reloadSwitch:0,currentPage:1},a.onAdd=a.onAdd.bind(Object(u.a)(a)),a.onRemove=a.onRemove.bind(Object(u.a)(a)),a.onRowsToggle=a.onRowsToggle.bind(Object(u.a)(a)),a.onLabelsSelected=a.onLabelsSelected.bind(Object(u.a)(a)),a.onPageChange=a.onPageChange.bind(Object(u.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"onRowsToggle",value:function(e){this.setState({selectedCalls:e}),this.setState({isEnabled:this.isEnabled(e,this.state.selectedLabels)})}},{key:"onLabelsSelected",value:function(e){this.setState({selectedLabels:e}),this.setState({isEnabled:this.isEnabled(this.state.selectedCalls,e)})}},{key:"onPageChange",value:function(e){this.setState({currentPage:e})}},{key:"onAdd",value:function(){var e=this,t=this.state,a=t.selectedCalls,n=t.reloadSwitch;y(a,this.createLabelOps("add")).then(function(t){console.log("successfully applied"),n?e.setState({reloadSwitch:0}):e.setState({reloadSwitch:1})})}},{key:"onRemove",value:function(){var e=this,t=this.state,a=t.selectedCalls,n=t.reloadSwitch;y(a,this.createLabelOps("remove")).then(function(t){console.log("successfully removed"),n?e.setState({reloadSwitch:0}):e.setState({reloadSwitch:1})})}},{key:"createLabelOps",value:function(e){var t=this.state.selectedLabels,a=[];if("add"===e)for(var n=0;n<t.length;n++){var l={name:t[n],op:"add"};a.push(l)}else if("remove"===e)for(var r=0;r<t.length;r++){var i={name:t[r],op:"remove"};a.push(i)}return a}},{key:"isEnabled",value:function(e,t){return e.length>0&&t.length>0}},{key:"render",value:function(){var e=this.state,t=e.isEnabled,a=e.reloadSwitch,n=e.currentPage;return l.a.createElement("div",{className:"LabelCalls"},l.a.createElement("div",{className:"LabelCalls__sidebar"},l.a.createElement("div",{className:"LabelCalls__labels"},l.a.createElement(x,{onLabelsSelected:this.onLabelsSelected})),l.a.createElement("div",{className:"LabelCalls__actions Actions"},l.a.createElement(O.a,{onClick:this.onAdd,disabled:!t,className:"Actions__add"},"Add"),l.a.createElement(O.a,{onClick:this.onRemove,disabled:!t,className:"Actions__remove"},"Remove"))),l.a.createElement("div",{className:"LabelCalls__calls"},l.a.createElement(V,{onRowsToggle:this.onRowsToggle,key:a,initialPage:n,onPageChange:this.onPageChange})))}}]),t}(l.a.Component)),G=(a(352),function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"Home"},l.a.createElement(H.b,{to:"/filter",className:"Home__link"},"Filtered Calls"),l.a.createElement(H.b,{to:"/label",className:"Home__link"},"Label Calls"))}}]),t}(l.a.Component));var J=function(){return l.a.createElement("div",{className:"App"},l.a.createElement(H.a,null,l.a.createElement(T.c,null,l.a.createElement(T.a,{exact:!0,path:"/",component:G}),l.a.createElement(T.a,{path:"/filter",component:N}),l.a.createElement(T.a,{path:"/label",component:B}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(l.a.createElement(J,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[194,1,2]]]);
//# sourceMappingURL=main.357da6bb.chunk.js.map