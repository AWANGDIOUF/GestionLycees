package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.PersonnelAppui;
import mefpai.gouv.sn.repository.PersonnelAppuiRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.PersonnelAppuiService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.PersonnelAppui}.
 */
@RestController
@RequestMapping("/api")
public class PersonnelAppuiResource {

    private final Logger log = LoggerFactory.getLogger(PersonnelAppuiResource.class);

    private static final String ENTITY_NAME = "personnelAppui";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PersonnelAppuiService personnelAppuiService;

    private final PersonnelAppuiRepository personnelAppuiRepository;

    public PersonnelAppuiResource(PersonnelAppuiService personnelAppuiService, PersonnelAppuiRepository personnelAppuiRepository) {
        this.personnelAppuiService = personnelAppuiService;
        this.personnelAppuiRepository = personnelAppuiRepository;
    }

    /**
     * {@code POST  /personnel-appuis} : Create a new personnelAppui.
     *
     * @param personnelAppui the personnelAppui to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new personnelAppui, or with status {@code 400 (Bad Request)} if the personnelAppui has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/personnel-appuis")
    public ResponseEntity<PersonnelAppui> createPersonnelAppui(@Valid @RequestBody PersonnelAppui personnelAppui)
        throws URISyntaxException {
        log.debug("REST request to save PersonnelAppui : {}", personnelAppui);
        if (personnelAppui.getId() != null) {
            throw new BadRequestAlertException("A new personnelAppui cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PersonnelAppui result = personnelAppuiService.save(personnelAppui);
        return ResponseEntity
            .created(new URI("/api/personnel-appuis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /personnel-appuis/:id} : Updates an existing personnelAppui.
     *
     * @param id the id of the personnelAppui to save.
     * @param personnelAppui the personnelAppui to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated personnelAppui,
     * or with status {@code 400 (Bad Request)} if the personnelAppui is not valid,
     * or with status {@code 500 (Internal Server Error)} if the personnelAppui couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/personnel-appuis/{id}")
    public ResponseEntity<PersonnelAppui> updatePersonnelAppui(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PersonnelAppui personnelAppui
    ) throws URISyntaxException {
        log.debug("REST request to update PersonnelAppui : {}, {}", id, personnelAppui);
        if (personnelAppui.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, personnelAppui.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!personnelAppuiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PersonnelAppui result = personnelAppuiService.save(personnelAppui);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, personnelAppui.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /personnel-appuis/:id} : Partial updates given fields of an existing personnelAppui, field will ignore if it is null
     *
     * @param id the id of the personnelAppui to save.
     * @param personnelAppui the personnelAppui to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated personnelAppui,
     * or with status {@code 400 (Bad Request)} if the personnelAppui is not valid,
     * or with status {@code 404 (Not Found)} if the personnelAppui is not found,
     * or with status {@code 500 (Internal Server Error)} if the personnelAppui couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/personnel-appuis/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<PersonnelAppui> partialUpdatePersonnelAppui(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PersonnelAppui personnelAppui
    ) throws URISyntaxException {
        log.debug("REST request to partial update PersonnelAppui partially : {}, {}", id, personnelAppui);
        if (personnelAppui.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, personnelAppui.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!personnelAppuiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PersonnelAppui> result = personnelAppuiService.partialUpdate(personnelAppui);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, personnelAppui.getId().toString())
        );
    }

    /**
     * {@code GET  /personnel-appuis} : get all the personnelAppuis.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of personnelAppuis in body.
     */
    @GetMapping("/personnel-appuis")
    public ResponseEntity<List<PersonnelAppui>> getAllPersonnelAppuis(Pageable pageable) {
        log.debug("REST request to get a page of PersonnelAppuis");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<PersonnelAppui> page = personnelAppuiService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (personnelAppuiService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((personnelAppuiRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /personnel-appuis/:id} : get the "id" personnelAppui.
     *
     * @param id the id of the personnelAppui to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the personnelAppui, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/personnel-appuis/{id}")
    public ResponseEntity<PersonnelAppui> getPersonnelAppui(@PathVariable Long id) {
        log.debug("REST request to get PersonnelAppui : {}", id);
        Optional<PersonnelAppui> personnelAppui = personnelAppuiService.findOne(id);
        return ResponseUtil.wrapOrNotFound(personnelAppui);
    }

    /**
     * {@code DELETE  /personnel-appuis/:id} : delete the "id" personnelAppui.
     *
     * @param id the id of the personnelAppui to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/personnel-appuis/{id}")
    public ResponseEntity<Void> deletePersonnelAppui(@PathVariable Long id) {
        log.debug("REST request to delete PersonnelAppui : {}", id);
        personnelAppuiService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
